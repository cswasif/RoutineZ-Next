import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime12Hour(time: string): string {
  if (!time) return "";
  
  const [hours, minutes] = time.split(":").map(Number);
  if (hours === undefined || minutes === undefined) return "";
  
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function getLabSchedulesArray(section: any) {
  const labSchedules = section.labSchedules;
  if (!labSchedules) return [];
  
  // Handle array format
  if (Array.isArray(labSchedules)) {
    return labSchedules.map((sched: any) => ({
      ...sched,
      room: section.labRoomName || sched.room || "TBA"
    }));
  }
  
  // Handle object format with classSchedules
  if (labSchedules.classSchedules && Array.isArray(labSchedules.classSchedules)) {
    return labSchedules.classSchedules.map((sched: any) => ({
      ...sched,
      room: section.labRoomName || sched.room || "TBA",
      faculty: section.labFaculties || "TBA"
    }));
  }
  
  return [];
}

export function getSeatStatusBadge(availableSeats: number, capacity: number) {
  if (availableSeats === undefined) return { text: "N/A", variant: "secondary" as const };
  
  const percentage = (availableSeats / capacity) * 100;
  
  if (availableSeats === 0) return { text: "Full", variant: "destructive" as const };
  if (percentage < 20) return { text: "Low", variant: "warning" as const };
  return { text: "Available", variant: "success" as const };
}