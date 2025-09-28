'use client';

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const TIME_SLOTS = [
  '8:00 AM-9:20 AM',
  '9:30 AM-10:50 AM',
  '11:00 AM-12:20 PM',
  '12:30 PM-1:50 PM',
  '2:00 PM-3:20 PM'
];

interface Course {
  courseCode: string;
  section: string;
  faculty: string;
  room: string;
  type: 'class' | 'lab';
}

interface ScheduleSlot {
  [key: string]: {
    [key: string]: Course;
  };
}

interface RoutineTableProps {
  schedule: ScheduleSlot;
}

export function RoutineTable({ schedule }: RoutineTableProps) {
  const [expandedCell, setExpandedCell] = useState<string | null>(null);

  // Sample data for demonstration
  const sampleSchedule: ScheduleSlot = {
    'Sunday': {
      '8:00 AM-9:20 AM': {
        courseCode: 'CSE110',
        section: 'A',
        faculty: 'Dr. Smith',
        room: 'UB80503',
        type: 'class'
      },
      '11:00 AM-12:20 PM': {
        courseCode: 'ACT301',
        section: 'B',
        faculty: 'Prof. Johnson',
        room: 'UB70201',
        type: 'class'
      }
    },
    'Tuesday': {
      '9:30 AM-10:50 AM': {
        courseCode: 'CSE110',
        section: 'A',
        faculty: 'Dr. Smith',
        room: 'UB50102',
        type: 'lab'
      },
      '2:00 PM-3:20 PM': {
        courseCode: 'ANT310',
        section: 'C',
        faculty: 'Dr. Brown',
        room: 'UB30405',
        type: 'class'
      }
    }
  };

  const scheduleData = Object.keys(schedule).length ? schedule : sampleSchedule;

  const toggleCell = (cellId: string) => {
    setExpandedCell(expandedCell === cellId ? null : cellId);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse min-w-[640px]">
        <thead>
          <tr>
            <th className="p-3 text-left font-medium text-muted-foreground bg-secondary/5 border-b">
              Time / Day
            </th>
            {DAYS.map((day) => (
              <th 
                key={day} 
                className="p-3 text-left font-medium text-muted-foreground bg-secondary/5 border-b"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_SLOTS.map((timeSlot, index) => (
            <tr key={timeSlot} className={cn(
              "hover:bg-muted/5 transition-colors",
              index % 2 === 0 ? "bg-background" : "bg-secondary/5"
            )}>
              <td className="p-3 border-r border-border/50 whitespace-nowrap font-medium text-sm">
                {timeSlot}
              </td>
              {DAYS.map((day) => {
                const courseData = scheduleData[day]?.[timeSlot];
                const cellId = `${day}-${timeSlot}`;
                const isExpanded = expandedCell === cellId;
                
                if (!courseData) {
                  return <td key={cellId} className="p-3 border-r border-border/50" />;
                }

                return (
                  <td 
                    key={cellId}
                    onClick={() => toggleCell(cellId)}
                    className={cn(
                      "p-3 border-r border-border/50 cursor-pointer touch-manipulation",
                      courseData.type === 'class' ? "bg-primary/5" : "bg-secondary/10",
                      "transition-colors hover:bg-primary/10",
                      "sm:touch-none"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">
                          {courseData.courseCode}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className={cn(
                            "text-xs px-1.5 py-0.5 rounded-full",
                            courseData.type === 'class' 
                              ? "bg-primary/10 text-primary" 
                              : "bg-secondary text-secondary-foreground"
                          )}>
                            {courseData.type === 'class' ? 'Class' : 'Lab'}
                          </span>
                          <ChevronDown 
                            className={cn(
                              "h-4 w-4 transition-transform sm:hidden",
                              isExpanded && "rotate-180"
                            )} 
                          />
                        </div>
                      </div>
                      <div className={cn(
                        "flex flex-col gap-1 overflow-hidden transition-all sm:!h-auto",
                        isExpanded ? "h-auto opacity-100" : "h-0 opacity-0 sm:opacity-100"
                      )}>
                        <div className="text-xs text-muted-foreground">
                          Section {courseData.section} • {courseData.faculty}
                        </div>
                        <div className="text-xs font-medium">
                          Room {courseData.room}
                        </div>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}