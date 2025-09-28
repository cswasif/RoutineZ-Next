'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FoundationCardProps {
  href: string;
  variant?: 'react' | 'turbo';
  title: string;
  subtitle: string;
  external?: boolean;
}

const TurboIcon = () => (
  <svg
    data-testid="geist-icon"
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
    style={{ width: '40px', height: '40px', color: 'currentcolor' }}
  >
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
        stroke="var(--ds-gray-1000)"
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

const ReactIcon = () => (
  <svg
    data-testid="geist-icon"
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
    style={{ width: '40px', height: '40px', color: 'currentcolor' }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 1.93782C4.70129 1.82161 4.99472 1.7858 5.41315 1.91053C5.83298 2.03567 6.33139 2.31073 6.87627 2.73948C7.01136 2.84578 7.14803 2.96052 7.28573 3.08331C6.86217 3.53446 6.44239 4.04358 6.03752 4.60092C5.35243 4.67288 4.70164 4.78186 4.09916 4.92309C4.06167 4.74244 4.03064 4.56671 4.00612 4.39656C3.90725 3.71031 3.91825 3.14114 4.01979 2.71499C4.12099 2.29025 4.29871 2.05404 4.5 1.93782ZM7.49466 1.95361C7.66225 2.08548 7.83092 2.22804 7.99999 2.38067C8.16906 2.22804 8.33773 2.08548 8.50532 1.95361C9.10921 1.47842 9.71982 1.12549 10.3012 0.952202C10.8839 0.778496 11.4838 0.7738 12 1.0718C12.5161 1.3698 12.812 1.89169 12.953 2.48322C13.0936 3.07333 13.0932 3.77858 12.9836 4.53917C12.9532 4.75024 12.9141 4.9676 12.8665 5.19034C13.0832 5.26044 13.291 5.33524 13.489 5.41444C14.2025 5.69983 14.8134 6.05217 15.2542 6.46899C15.696 6.8868 16 7.404 16 8C16 8.596 15.696 9.11319 15.2542 9.53101C14.8134 9.94783 14.2025 10.3002 13.489 10.5856C13.291 10.6648 13.0832 10.7396 12.8665 10.8097C12.9141 11.0324 12.9532 11.2498 12.9837 11.4608C13.0932 12.2214 13.0936 12.9267 12.953 13.5168C12.812 14.1083 12.5161 14.6302 12 14.9282C11.4839 15.2262 10.8839 15.2215 10.3012 15.0478C9.71984 14.8745 9.10923 14.5216 8.50534 14.0464C8.33775 13.9145 8.16906 13.7719 7.99999 13.6193C7.83091 13.7719 7.66223 13.9145 7.49464 14.0464C6.89075 14.5216 6.28014 14.8745 5.69879 15.0478C5.11605 15.2215 4.51613 15.2262 3.99998 14.9282C3.48383 14.6302 3.18794 14.1083 3.047 13.5168C2.9064 12.9267 2.90674 12.2214 3.01632 11.4608C3.04673 11.2498 3.08586 11.0324 3.13351 10.8097C2.91679 10.7395 2.709 10.6648 2.511 10.5856C1.79752 10.3002 1.18658 9.94783 0.745833 9.53101C0.304028 9.11319 0 8.596 0 8C0 7.404 0.304028 6.8868 0.745833 6.46899C1.18658 6.05217 1.79752 5.69983 2.511 5.41444C2.709 5.33524 2.9168 5.26044 3.13352 5.19034C3.08587 4.9676 3.04675 4.75024 3.01634 4.53917C2.90676 3.77858 2.90642 3.07332 3.04702 2.48321C3.18796 1.89169 3.48385 1.3698 4 1.0718C4.51615 0.773798 5.11607 0.778495 5.69881 0.952201C6.28016 1.12549 6.89077 1.47841 7.49466 1.95361Z"
      fill="#149ECA"
    />
  </svg>
);

const ExternalIcon = () => (
  <svg
    data-testid="geist-icon"
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
    style={{ width: '16px', height: '16px', color: 'var(--ds-gray-700)' }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.75001 2H5.00001V3.5H5.75001H11.4393L2.21968 12.7197L1.68935 13.25L2.75001 14.3107L3.28034 13.7803L12.4988 4.56182V10.25V11H13.9988V10.25V3C13.9988 2.44772 13.5511 2 12.9988 2H5.75001Z"
      fill="currentColor"
    />
  </svg>
);

export function FoundationCard({
  href,
  variant = 'react',
  title,
  subtitle,
  external = true,
}: FoundationCardProps) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'group flex flex-col gap-0 rounded-xl border border-[--ds-gray-alpha-400] bg-[--ds-gray-alpha-100] p-6 transition-all duration-200',
        'hover:border-[--ds-gray-alpha-800] hover:bg-[--ds-gray-alpha-200]',
        'focus:outline-none focus:ring-2 focus:ring-[--ds-gray-alpha-800] focus:ring-offset-2',
        'dark:border-[--ds-gray-alpha-400] dark:bg-[--ds-gray-alpha-100]',
        'dark:hover:border-[--ds-gray-alpha-600] dark:hover:bg-[--ds-gray-alpha-200]',
        'dark:focus:ring-[--ds-gray-alpha-600]'
      )}
    >
      <div className="mb-4">{variant === 'react' ? <ReactIcon /> : <TurboIcon />}</div>
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-1 text-lg font-semibold text-[--ds-gray-1000]">
          {title}
          {external && <ExternalIcon />}
        </span>
        <span className="text-sm text-[--ds-gray-900]">{subtitle}</span>
      </div>
    </Link>
  );
}