"use client";

import { Course } from "@/lib/api";
import { Card } from "./card";

interface CourseInfoProps {
  course: Course | null;
  title: string;
}

export function CourseInfo({ course, title }: CourseInfoProps) {
  if (!course) {
    return (
      <Card className="p-4 bg-muted/50">
        <h3 className="text-sm font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">Select a course to view details</p>
      </Card>
    );
  }

  // Handle faculty display - could be string or array
  const facultyDisplay = Array.isArray(course.faculties) 
    ? course.faculties.join(", ")
    : course.faculties || "TBA";

  return (
    <Card className="p-4 bg-muted/50">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Course Code:</span> {course.courseCode}
        </div>
        <div>
          <span className="font-medium">Faculty:</span> {facultyDisplay}
        </div>
        <div>
          <span className="font-medium">Section:</span> {course.sectionName}
        </div>
        <div>
          <span className="font-medium">Schedule:</span>
          <ul className="list-disc list-inside pl-2">
            {course.sectionSchedule?.classSchedules?.map((slot, index) => (
              <li key={`class-${index}`}>
                {slot.day} {slot.startTime}-{slot.endTime} {slot.room && `(${slot.room})`}
              </li>
            ))}
            {course.sectionSchedule?.labSchedules?.map((slot, index) => (
              <li key={`lab-${index}`}>
                Lab: {slot.day} {slot.startTime}-{slot.endTime} {slot.room && `(${slot.room})`}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="font-medium">Exam:</span>{" "}
          {course.sectionSchedule?.finalExamDate && course.sectionSchedule?.finalExamStartTime
            ? `${course.sectionSchedule.finalExamDate} ${course.sectionSchedule.finalExamStartTime}`
            : "TBA"}
        </div>
        <div>
          <span className="font-medium">Capacity:</span> {course.capacity}
        </div>
        <div>
          <span className="font-medium">Enrolled:</span> {course.consumedSeat}
        </div>
        <div>
          <span className="font-medium">Available Seats:</span>{" "}
          {course.capacity - course.consumedSeat}
        </div>
      </div>
    </Card>
  );
}