import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.css";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RoutineZ - Smart Course Scheduling",
  description: "Generate optimal class schedules with AI-powered course planning. Create conflict-free timetables for your academic journey.",
  keywords: ["course scheduling", "timetable generator", "class scheduler", "academic planning", "university courses"],
  authors: [{ name: "RoutineZ Team" }],
  openGraph: {
    title: "RoutineZ - Smart Course Scheduling",
    description: "Generate optimal class schedules with AI-powered course planning",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
