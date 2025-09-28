'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const GitHubIcon = () => (
  <svg
    data-testid="geist-icon"
    height="16"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', color: 'currentColor' }}
    viewBox="0 0 16 16"
    width="16"
  >
    <g clipPath="url(#clip0_872_3147)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_872_3147">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const TwitterIcon = () => (
  <svg
    data-testid="geist-icon"
    height="16"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', color: 'currentColor' }}
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
      fill="currentColor"
    />
  </svg>
);

const BlueskyIcon = () => (
  <svg
    className="footer-module__rV1DKq__socialIcon"
    data-testid="geist-icon"
    height="16"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', color: 'currentColor' }}
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fill="#1185FE"
      d="M3.47 1.95A19 19 0 0 1 8 7.62c.73-1.5 2.7-4.3 4.53-5.67C13.86.95 16 .19 16 2.63c0 .5-.28 4.1-.44 4.7-.58 2.03-2.66 2.55-4.5 2.24 3.23.55 4.05 2.38 2.27 4.2-3.37 3.46-4.85-.87-5.23-1.98q-.1-.32-.1-.22 0-.1-.1.22c-.38 1.11-1.86 5.44-5.23 1.98-1.78-1.82-.96-3.65 2.28-4.2C3.1 9.89 1 9.37.45 7.32A48 48 0 0 1 0 2.63C0 .2 2.15.96 3.47 1.95"
    />
  </svg>
);

export function Footer() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container grid gap-8 px-8 md:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <h2 className="text-2xl font-bold">RoutineZ</h2>
          <p className="text-muted-foreground">
            Smart course scheduling made simple. Generate conflict-free class schedules with AI-powered optimization.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/yourusername/routinez"
              target="_blank"
              rel="noopener"
              className="hover:opacity-75"
              style={{ mixBlendMode: 'luminosity' }}
            >
              <GitHubIcon />
            </Link>
            <div className="h-4 w-px bg-border" />
            <Link
              href="https://twitter.com/routinez"
              target="_blank"
              rel="noopener"
              className="hover:opacity-75"
              style={{ mixBlendMode: 'luminosity' }}
            >
              <TwitterIcon />
            </Link>
            <div className="h-4 w-px bg-border" />
            <Link
              href="https://bsky.app/profile/routinez.org"
              target="_blank"
              rel="noopener"
              className="hover:opacity-75"
              style={{ mixBlendMode: 'luminosity' }}
            >
              <BlueskyIcon />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Resources</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground">Docs</Link>
            <Link href="/support" className="hover:text-foreground">Support</Link>
            <Link href="/learn" className="hover:text-foreground">Learn</Link>
            <Link href="/showcase" className="hover:text-foreground">Showcase</Link>
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">More</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground">About Us</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
            <Link href="/community" className="hover:text-foreground">Community</Link>
            <Link href="/releases" className="hover:text-foreground">Releases</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Newsletter</h4>
          <p className="text-sm text-muted-foreground">
            Stay updated on new features, guides, and case studies.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="you@domain.com"
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              required
            />
            <Button type="submit" size="sm">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
}