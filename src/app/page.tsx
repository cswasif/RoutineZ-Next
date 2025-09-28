import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Zap, Shield, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FoundationCard } from '@/components/foundation-card';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero Section */}
      <section className="mx-auto flex w-full max-w-[1120px] flex-col items-center justify-center gap-4 px-4 py-24 md:py-32">
        <div className="flex max-w-[640px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Smart Course Scheduling
            <span className="block text-primary">Made Simple</span>
          </h1>
          <p className="max-w-[85%] text-lg text-muted-foreground sm:text-xl">
            Generate conflict-free class schedules with AI-powered optimization. 
            Save time and avoid scheduling headaches with RoutineZ.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/generator">
              <Button size="lg" className="h-12 px-6">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg" className="h-12 px-6">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full border-y bg-secondary/50">
        <div className="mx-auto max-w-[1120px] px-4 py-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for perfect scheduling
            </h2>
            <p className="max-w-[85%] text-lg text-muted-foreground">
              Powerful features to help you create the perfect class schedule
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col items-start gap-2 p-6 border-border">
              <div className="rounded-lg bg-primary/5 p-2">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">AI-Powered Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms analyze course conflicts and preferences to generate optimal schedules automatically.
              </p>
            </Card>

            <Card className="flex flex-col items-start gap-2 p-6 border-border">
              <div className="rounded-lg bg-primary/5 p-2">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Conflict Detection</h3>
              <p className="text-sm text-muted-foreground">
                Automatically detect and resolve time conflicts, prerequisites, and capacity issues before they become problems.
              </p>
            </Card>

            <Card className="flex flex-col items-start gap-2 p-6 border-border">
              <div className="rounded-lg bg-primary/5 p-2">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Time Management</h3>
              <p className="text-sm text-muted-foreground">
                Efficiently manage your time with smart scheduling that considers your preferences and commitments.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="w-full py-20">
        <div className="mx-auto max-w-[1120px] px-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Our Other Solutions
            </h2>
            <p className="max-w-[85%] text-lg text-muted-foreground">
              Discover more tools designed to enhance your BRACU experience
            </p>
          </div>
          
          <div className="mt-16 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            <FoundationCard
              href="https://seatz.vercel.app"
              variant="turbo"
              title="Seatz"
              subtitle="Real-time seat monitoring system for BRACU. Track available seats and get instant notifications when spots open up."
            />
            <FoundationCard
              href="https://ratez.vercel.app"
              variant="react"
              title="Ratez"
              subtitle="Faculty rating and review platform. Make informed decisions about your course selections with peer reviews and ratings."
            />
            <FoundationCard
              href="https://seatstatus.vercel.app"
              variant="turbo"
              title="Seat Status"
              subtitle="Quick seat availability checker. Get instant updates on course section capacities and waitlist status."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
