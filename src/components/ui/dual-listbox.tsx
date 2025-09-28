"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Course } from "@/lib/api";
import { CourseInfo } from "./course-info";

interface ListboxOption {
  value: number;
  text: string;
  course: Course;
}

interface DualListboxProps {
  available: ListboxOption[];
  selected: number[];
  onChange: (selected: number[]) => void;
  availableTitle?: string;
  selectedTitle?: string;
}

export function DualListbox({
  available,
  selected,
  onChange,
  availableTitle = "Available",
  selectedTitle = "Selected",
}: DualListboxProps) {
  const [selectedAvailable, setSelectedAvailable] = useState<number[]>([]);
  const [selectedSelected, setSelectedSelected] = useState<number[]>([]);
  const [selectedAvailableCourse, setSelectedAvailableCourse] = useState<Course | null>(null);
  const [selectedSelectedCourse, setSelectedSelectedCourse] = useState<Course | null>(null);
  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchSelected, setSearchSelected] = useState("");

  const handleSelect = useCallback(() => {
    const newSelected = [...selected, ...selectedAvailable];
    onChange(newSelected);
    setSelectedAvailable([]);
    setSelectedAvailableCourse(null);
  }, [selected, selectedAvailable, onChange]);

  const handleDeselect = useCallback(() => {
    const newSelected = selected.filter((item) => !selectedSelected.includes(item));
    onChange(newSelected);
    setSelectedSelected([]);
    setSelectedSelectedCourse(null);
  }, [selected, selectedSelected, onChange]);

  const handleAvailableClick = useCallback((value: number, course: Course) => {
    setSelectedAvailable(prev => {
      if (prev.includes(value)) {
        setSelectedAvailableCourse(null);
        return prev.filter(item => item !== value);
      } else {
        setSelectedAvailableCourse(course);
        return [...prev, value];
      }
    });
  }, []);

  const handleSelectedClick = useCallback((value: number, course: Course) => {
    setSelectedSelected(prev => {
      if (prev.includes(value)) {
        setSelectedSelectedCourse(null);
        return prev.filter(item => item !== value);
      } else {
        setSelectedSelectedCourse(course);
        return [...prev, value];
      }
    });
  }, []);

  const availableOptions = available.filter(
    (item) => !selected.includes(item.value)
  ).filter(item => 
    item.text.toLowerCase().includes(searchAvailable.toLowerCase()) ||
    item.course.courseCode.toLowerCase().includes(searchAvailable.toLowerCase())
  );

  const selectedOptions = available.filter(
    (item) => selected.includes(item.value)
  ).filter(item => 
    item.text.toLowerCase().includes(searchSelected.toLowerCase()) ||
    item.course.courseCode.toLowerCase().includes(searchSelected.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Available Courses */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">{availableTitle}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelect}
              disabled={selectedAvailable.length === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mb-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchAvailable}
                onChange={(e) => setSearchAvailable(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="border rounded-md h-48 overflow-y-auto bg-card/50">
            <ul className="p-2">
              {availableOptions.map((item) => (
                <li
                  key={item.value}
                  className={`px-3 py-2 rounded-sm cursor-pointer ${
                    selectedAvailable.includes(item.value)
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => handleAvailableClick(item.value, item.course)}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <CourseInfo course={selectedAvailableCourse} title="Course Information" />
          </div>
        </div>

        {/* Selected Courses */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">{selectedTitle}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeselect}
              disabled={selectedSelected.length === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="mb-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search selected..."
                value={searchSelected}
                onChange={(e) => setSearchSelected(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="border rounded-md h-48 overflow-y-auto bg-card/50">
            <ul className="p-2">
              {selectedOptions.map((item) => (
                <li
                  key={item.value}
                  className={`px-3 py-2 rounded-sm cursor-pointer ${
                    selectedSelected.includes(item.value)
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => handleSelectedClick(item.value, item.course)}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <CourseInfo course={selectedSelectedCourse} title="Course Information" />
          </div>
        </div>
      </div>
    </div>
  );
}