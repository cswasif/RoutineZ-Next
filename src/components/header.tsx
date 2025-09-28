'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, Settings } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full flex-none transition-colors duration-500",
      isScrolled 
        ? "bg-background/75 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b border-slate-900/10 dark:border-slate-50/[0.06]" 
        : "bg-transparent"
    )}>
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            className="flex items-center gap-2 transition-opacity hover:opacity-80" 
            href="/"
          >
            <Calendar className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">RoutineZ</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link 
              className="transition-colors hover:text-foreground/80 text-foreground/60 font-medium" 
              href="/routines"
            >
              My Routines
            </Link>
            <Link 
              className="transition-colors hover:text-foreground/80 text-foreground/60 font-medium" 
              href="/courses"
            >
              Courses
            </Link>
            <Link 
              className="transition-colors hover:text-foreground/80 text-foreground/60 font-medium" 
              href="/seats"
            >
              Seats
            </Link>
            <Link 
              className="transition-colors hover:text-foreground/80 text-foreground/60 font-medium" 
              href="/generator"
            >
              Generator
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 hidden sm:flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Routine
          </Button>
          <ThemeSwitcher />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}