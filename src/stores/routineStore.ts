import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Course {
  id: string;
  code: string;
  title: string;
  credit: number;
  section: string;
  faculty: string;
  time: string;
  room: string;
  days: string[];
}

interface Routine {
  id: string;
  name: string;
  courses: Course[];
  createdAt: Date;
}

interface RoutineStore {
  routines: Routine[];
  currentRoutine: Routine | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentRoutine: (routine: Routine | null) => void;
  addRoutine: (routine: Routine) => void;
  removeRoutine: (id: string) => void;
  updateRoutine: (id: string, routine: Partial<Routine>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useRoutineStore = create<RoutineStore>()(
  persist(
    (set) => ({
      routines: [],
      currentRoutine: null,
      isLoading: false,
      error: null,
      
      setCurrentRoutine: (routine) => set({ currentRoutine: routine }),
      addRoutine: (routine) => set((state) => ({ 
        routines: [...state.routines, routine] 
      })),
      removeRoutine: (id) => set((state) => ({ 
        routines: state.routines.filter(r => r.id !== id) 
      })),
      updateRoutine: (id, updatedRoutine) => set((state) => ({
        routines: state.routines.map(r => 
          r.id === id ? { ...r, ...updatedRoutine } : r
        )
      })),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'routinez-storage',
    }
  )
);