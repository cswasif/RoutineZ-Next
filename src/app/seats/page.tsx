"use client";

import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTime12Hour, getLabSchedulesArray, getSeatStatusBadge } from "@/lib/utils";

interface Course {
  code: string;
  title?: string;
}

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  room?: string;
}

interface Section {
  sectionId: string;
  sectionName: string;
  courseCode: string;
  faculties: string;
  capacity: number;
  availableSeats: number;
  sectionSchedule?: {
    classSchedules: Schedule[];
  };
  labSchedules?: Schedule[] | { classSchedules: Schedule[] };
  labRoomName?: string;
  labFaculties?: string;
  midExamDate?: string;
  finalExamDate?: string;
  formattedMidExamTime?: string;
  formattedFinalExamTime?: string;
}

export default function SeatsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConnected, setIsConnected] = useState(true); // Always true for static CDN data
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Fetch all courses from CDN
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://usis-cdn.eniamza.com/connect.json");
        const data = await response.json();
        
        // Extract unique courses from sections
        const courseMap = new Map();
        data.forEach((section: any) => {
          if (!courseMap.has(section.courseCode)) {
            courseMap.set(section.courseCode, {
              code: section.courseCode,
              title: section.courseTitle && section.courseTitle !== section.courseCode ? section.courseTitle : undefined
            });
          }
        });
        
        const coursesData = Array.from(courseMap.values()).sort((a, b) => a.code.localeCompare(b.code));
        setCourses(coursesData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch sections for selected course from CDN
  const fetchSections = async (courseCode: string, showLoading = true) => {
    if (!courseCode) return;

    try {
      if (showLoading) setLoading(true);
      const response = await fetch("https://usis-cdn.eniamza.com/connect.json");
      const data = await response.json();
      
      // Filter sections for the selected course
      const courseSections = data.filter((section: any) => section.courseCode === courseCode);
      
      // Transform the data to match our interface
      const sectionsData = courseSections.map((section: any) => ({
        sectionId: section.sectionId.toString(),
        sectionName: section.sectionName,
        courseCode: section.courseCode,
        faculties: section.faculties || 'TBA',
        capacity: section.capacity,
        availableSeats: section.capacity - section.consumedSeat,
        sectionSchedule: section.sectionSchedule,
        labSchedules: section.labSchedules,
        labRoomName: section.labRoomName,
        labFaculties: section.labFaculties,
        midExamDate: section.sectionSchedule?.midExamDate,
        finalExamDate: section.sectionSchedule?.finalExamDate,
        formattedMidExamTime: section.sectionSchedule?.midExamDetail,
        formattedFinalExamTime: section.sectionSchedule?.finalExamDetail
      })).sort((a: Section, b: Section) => a.sectionName.localeCompare(b.sectionName)); // Sort by section name in ascending order
      
      setSections(sectionsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch sections:", error);
      setSections([]);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasAvailableSeats = sections.some(section => section.availableSeats > 0);
  const totalAvailableSeats = sections.reduce((sum, section) => sum + (section.availableSeats || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Seat Status
          </h1>
          <p className="text-muted-foreground">Live course availability and seat tracking</p>
          
          {/* Connection Status */}
          <div className="mt-4 flex justify-center">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              isConnected 
                ? "bg-primary/10 text-primary" 
                : "bg-muted text-muted-foreground"
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                isConnected ? "bg-primary animate-pulse" : "bg-muted-foreground"
              }`}></div>
              {isConnected ? "● Live Updates Connected" : "● Connecting to Live Updates..."}
            </div>
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Search Course
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter course code or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                {searchTerm && filteredCourses.length > 0 && (
                  <div className="absolute z-10 mt-1 w-[400px] bg-background rounded-lg shadow-lg border border-border max-h-60 overflow-auto">
                    {filteredCourses.map((course) => (
                      <button
                        key={course.code}
                        onClick={() => {
                          setSelectedCourse(course.code);
                          setSearchTerm("");
                          fetchSections(course.code);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-muted"
                      >
                        <div className="font-medium text-foreground">{course.code}</div>
                        {course.title && course.title !== course.code && (
                          <div className="text-sm text-muted-foreground">{course.title}</div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => selectedCourse && fetchSections(selectedCourse, true)}
                  disabled={!selectedCourse || loading}
                  variant="secondary"
                >
                  Refresh
                </Button>
              </div>

              {lastUpdated && (
                <div className="text-sm text-muted-foreground">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {!selectedCourse ? (
          <div className="text-center py-12">
            <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-base font-medium text-foreground mb-1">
              Search for Courses
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter a course code to see seat availability
            </p>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading sections...</p>
          </div>
        ) : sections.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-base font-medium text-foreground mb-1">
              No Sections Available
            </h3>
            <p className="text-sm text-muted-foreground">
              There are no sections available for this course at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            {/* Course Summary */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-foreground">
                      {sections.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Sections</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-foreground">
                      {totalAvailableSeats}
                    </div>
                    <div className="text-sm text-muted-foreground">Available Seats</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-foreground">
                      {sections.reduce((sum, section) => sum + section.capacity, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Capacity</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={hasAvailableSeats ? "success" : "destructive"} className="transition-all duration-200 hover:scale-105">
                        {hasAvailableSeats ? "Seats Available" : "No Seats"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Overall Status</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sections Table */}
            <div className="overflow-hidden rounded-lg border border-border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Section</TableHead>
                    <TableHead className="font-semibold">Faculty</TableHead>
                    <TableHead className="font-semibold">Schedule</TableHead>
                    <TableHead className="text-right font-semibold">Capacity</TableHead>
                    <TableHead className="text-right font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sections.map((section, index) => (
                    <TableRow 
                      key={section.sectionId} 
                      className={`group border-b border-border/50 hover:bg-muted/30 transition-all duration-200 cursor-pointer ${
                        selectedSection === section.sectionId ? "bg-muted/40 ring-2 ring-primary/20" : ""
                      }`}
                      onClick={() => setSelectedSection(selectedSection === section.sectionId ? null : section.sectionId)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                            selectedSection === section.sectionId 
                              ? "bg-primary text-primary-foreground scale-110" 
                              : "bg-primary/10 text-primary group-hover:bg-primary/20"
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground text-base">{section.sectionName}</div>
                            <div className="text-sm text-muted-foreground">{section.courseCode}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{section.faculties}</div>
                          {section.labFaculties && (
                            <div className="text-sm text-muted-foreground">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted">
                                Lab: {section.labFaculties}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          {section.sectionSchedule?.classSchedules?.map((schedule: any, idx: number) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm">
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                                {schedule.day}
                              </span>
                              <span className="text-foreground">
                                {formatTime12Hour(schedule.startTime)} - {formatTime12Hour(schedule.endTime)}
                              </span>
                              {schedule.room && (
                                <span className="text-muted-foreground text-xs">
                                  ({schedule.room})
                                </span>
                              )}
                            </div>
                          ))}
                          {getLabSchedulesArray(section).map((schedule: any, idx: number) => (
                            <div key={`lab-${idx}`} className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted">
                                Lab
                              </span>
                              <span>
                                {schedule.day} {formatTime12Hour(schedule.startTime)} - {formatTime12Hour(schedule.endTime)}
                              </span>
                              {schedule.room && (
                                <span className="text-xs">
                                  ({schedule.room})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="space-y-2">
                          <div className="font-semibold text-lg">{section.availableSeats}</div>
                          <div className="text-sm text-muted-foreground">of {section.capacity}</div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                                section.availableSeats === 0 
                                  ? "bg-destructive" 
                                  : section.availableSeats <= section.capacity * 0.2
                                  ? "bg-yellow-500"
                                  : "bg-primary"
                              }`}
                              style={{
                                width: `${Math.max((section.availableSeats / section.capacity) * 100, 5)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge 
                          variant={getSeatStatusBadge(section.availableSeats, section.capacity).variant}
                          className="group-hover:scale-105 transition-transform duration-200"
                        >
                          {getSeatStatusBadge(section.availableSeats, section.capacity).text}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
