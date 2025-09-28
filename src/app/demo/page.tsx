'use client';

import { FoundationCard } from '@/components/foundation-card';
import { Footer } from '@/components/footer';
import CustomerTestimonials from '@/components/customer-testimonials';

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-10">
          <h1 className="mb-8 text-3xl font-bold">Foundation Cards Demo</h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
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
        
        {/* Customer Testimonials Section */}
        <div className="container py-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
            <p className="text-muted-foreground">Hear from students and faculty who love our platform</p>
          </div>
          <CustomerTestimonials />
        </div>
      </main>
      <Footer />
    </div>
  );
}