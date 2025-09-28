'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TurboCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  external?: boolean;
}

export function TurboCard({ href, icon, title, subtitle, external = false }: TurboCardProps) {
  return (
    <Link
      className={cn(
        "group flex flex-col gap-0 rounded-lg border border-border/50 bg-background p-4",
        "hover:border-border/100 hover:shadow-sm transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="flex flex-col gap-4">
        <div className="text-foreground/80">
          {icon}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <span className="font-medium">{title}</span>
            {external && (
              <svg
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="16"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

export function TurboIcon() {
  return (
    <svg height="40" width="40" viewBox="0 0 16 16" className="text-foreground">
      <g clipPath="url(#clip0_872_3187)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.26824e-06 2.99332C2.42358e-06 2.99555 0 2.99777 0 3V13C0 13.6479 0.205396 14.2479 0.554626 14.7383L2.03387 13.259C2.01178 13.1764 2 13.0896 2 13V8H7.26824e-06V2.99332ZM8.00001 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H8.50001V16H13C14.6569 16 16 14.6569 16 13V3C16 1.34315 14.6569 0 13 0H8.00001V2ZM7.50001 16V14H3C2.91042 14 2.82359 13.9882 2.74098 13.9661L1.26173 15.4454C1.75214 15.7946 2.35208 16 3 16H7.50001Z"
          fill="url(#paint0_linear_872_3187)"
        />
        <mask id="path-2-inside-1_872_3187" fill="white">
          <rect x="3.5" y="3.5" width="9" height="9" rx="0.5" />
        </mask>
        <rect
          x="3.5"
          y="3.5"
          width="9"
          height="9"
          rx="0.5"
          stroke="currentColor"
          fill="transparent"
          strokeWidth="4"
          mask="url(#path-2-inside-1_872_3187)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_872_3187"
          x1="8.68832"
          y1="1.98437"
          x2="1.79792"
          y2="8.82805"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0096FF" />
          <stop offset="1" stopColor="#FF1E56" />
        </linearGradient>
        <clipPath id="clip0_872_3187">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}