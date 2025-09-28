import axios from 'axios';

const API_BASE_URL = process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export interface CourseSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room?: string;
}

export interface Course {
  courseCode: string;
  sectionName: string;
  faculties: string[];
  courseCredit: number;
  capacity: number;
  consumedSeat: number;
  roomName: string;
  labRoomName?: string;
  preRegSchedule: string[];
  sectionSchedule?: {
    classSchedules: CourseSchedule[];
    labSchedules?: CourseSchedule[];
    finalExamDate?: string;
    finalExamStartTime?: string;
    finalExamDetail?: string;
  };
}

export interface CourseOption {
  value: number;
  text: string;
  desc: Course;
}

export interface GenerateRoutineParams {
  courses: Course[];
  preferences?: {
    avoid_morning?: boolean;
    avoid_evening?: boolean;
    minimize_gaps?: boolean;
  };
}

class CourseAPI {
  private static instance: CourseAPI;
  private courseData: Course[] = [];
  private isLoading = false;

  private constructor() {}

  public static getInstance(): CourseAPI {
    if (!CourseAPI.instance) {
      CourseAPI.instance = new CourseAPI();
    }
    return CourseAPI.instance;
  }

  public async fetchCourses(): Promise<Course[]> {
    if (this.courseData.length > 0) {
      return this.courseData;
    }

    if (this.isLoading) {
      // Wait for the existing request to complete
      await new Promise(resolve => {
        const checkLoading = () => {
          if (!this.isLoading) {
            resolve(true);
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      });
      return this.courseData;
    }

    try {
      this.isLoading = true;
      const response = await fetch('https://usis-cdn.eniamza.com/connect.json');
      if (!response.ok) {
        throw new Error('Failed to fetch course data');
      }
      
      const data = await response.json();
      this.courseData = data.sort((a: Course, b: Course) => {
        const courseA = `${a.courseCode}-${a.sectionName}`;
        const courseB = `${b.courseCode}-${b.sectionName}`;
        return courseA.localeCompare(courseB);
      });

      return this.courseData;
    } catch (error) {
      console.error('Error fetching course data:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  public formatCourseOptions(): Promise<CourseOption[]> {
    return this.fetchCourses().then(courses => {
      return courses.map((course, index) => ({
        value: index + 1,
        text: `${course.courseCode}: sec-${course.sectionName}`,
        desc: course
      }));
    });
  }

  public validateCourseSelection(selectedCourses: Course[]): { 
    isValid: boolean; 
    totalCredits: number;
    warnings: string[];
  } {
    const warnings: string[] = [];
    let totalCredits = 0;

    // Check for duplicate courses
    const courseCodes = new Set<string>();
    selectedCourses.forEach(course => {
      if (courseCodes.has(course.courseCode)) {
        warnings.push(`Duplicate course selected: ${course.courseCode}`);
      }
      courseCodes.add(course.courseCode);
      totalCredits += course.courseCredit;
    });

    // Check credit limit
    if (totalCredits > 15) {
      warnings.push('Total credits exceed the maximum limit of 15');
    }

    return {
      isValid: warnings.length === 0,
      totalCredits,
      warnings
    };
  }
}

export const courseAPI = CourseAPI.getInstance();

export const api = {
  // Course-related endpoints
  getCourses: () => courseAPI.fetchCourses(),
  getCourseOptions: () => courseAPI.formatCourseOptions(),
  validateSelection: (courses: Course[]) => courseAPI.validateCourseSelection(courses),
  
  // Routine generation
  generateRoutine: (params: GenerateRoutineParams) => 
    apiClient.post('/api/routine', params),
  
  // Routine management
  saveRoutine: (routine: any) => apiClient.post('/api/routines', routine),
  getRoutines: () => apiClient.get('/api/routines'),
  deleteRoutine: (id: string) => apiClient.delete(`/api/routines/${id}`),
};