'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar as CalendarIcon, Globe, Users, Bell, Settings, Copy, Check } from 'lucide-react';
import { notificationService } from '@/services/notifications';
import { Toaster } from 'sonner';
import { fadeIn, slideIn, scaleIn, staggerChildren, cardHover } from '@/lib/animations';

const MotionCard = motion(Card);

export default function GeneratorPage() {
  const [bookingLink, setBookingLink] = useState('routinez.com/your-name');
  const [dailyLimit, setDailyLimit] = useState(8);
  const [bufferTime, setBufferTime] = useState(15);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'CSE101: Introduction to Programming',
      time: '10:00 AM',
      day: 'Monday',
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'MAT201: Linear Algebra',
      time: '2:00 PM',
      day: 'Monday',
      status: 'upcoming'
    }
  ]);

  useEffect(() => {
    // Schedule notifications for upcoming classes
    if (notifications) {
      classes.forEach(classItem => {
        const timeParts = classItem.time.replace(' AM', '').replace(' PM', '').split(':');
        const hours = Number(timeParts[0]) || 0;
        const minutes = Number(timeParts[1]) || 0;
        const isPM = classItem.time.includes('PM');
        const notificationTime = new Date();
        notificationTime.setHours(isPM ? hours + 12 : hours, minutes - 30); // 30 minutes before class

        if (notificationTime > new Date()) {
          notificationService.scheduleNotification({
            title: 'Upcoming Class Reminder',
            message: `Your ${classItem.name} class starts in 30 minutes at ${classItem.time}`,
            type: emailNotifications ? 'email' : 'push',
            priority: 'high',
            scheduledFor: notificationTime,
          });
        }
      });
    }
  }, [notifications, emailNotifications, classes]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bookingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // Here you would typically fetch classes for the selected date
  };

  const handleNotificationToggle = (checked: boolean) => {
    setNotifications(checked);
    if (checked) {
      notificationService.scheduleNotification({
        title: 'Notifications Enabled',
        message: 'You will now receive notifications about your upcoming classes',
        type: 'push',
        priority: 'low',
        scheduledFor: new Date(),
      });
    }
  };

  const handleEmailNotificationToggle = (checked: boolean) => {
    setEmailNotifications(checked);
    if (checked) {
      notificationService.scheduleNotification({
        title: 'Email Notifications Enabled',
        message: 'You will now receive email notifications about your upcoming classes',
        type: 'email',
        priority: 'low',
        scheduledFor: new Date(),
      });
    }
  };

  const handleSMSNotificationToggle = (checked: boolean) => {
    setSmsNotifications(checked);
    if (checked) {
      notificationService.scheduleNotification({
        title: 'SMS Notifications Enabled',
        message: 'You will now receive SMS notifications about your upcoming classes',
        type: 'sms',
        priority: 'low',
        scheduledFor: new Date(),
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={staggerChildren}
    >
      <Toaster position="top-right" />
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-b from-primary/10 to-background pt-20 pb-32"
        variants={fadeIn}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={slideIn}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Schedule your classes with ease
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Create your perfect class schedule with our intelligent routine generator. Set your preferences, customize your availability, and let us do the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerChildren}
        >
          {/* Booking Link Card */}
          <MotionCard
            className="p-6 bg-card shadow-xl"
            variants={scaleIn}
            whileHover={cardHover.whileHover}
            whileTap={cardHover.whileTap}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Globe className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Your Booking Link</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="booking-link">Custom URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="booking-link"
                    value={bookingLink}
                    onChange={(e) => setBookingLink(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    className="shrink-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Share this link with others to let them view your schedule
              </p>
            </div>
          </MotionCard>

          {/* Availability Limits Card */}
          <MotionCard
            className="p-6 bg-card shadow-xl"
            variants={scaleIn}
            whileHover={cardHover.whileHover}
            whileTap={cardHover.whileTap}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Availability Limits</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label>Daily Class Limit</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    value={[dailyLimit]}
                    onValueChange={(value) => setDailyLimit(value?.[0] ?? 8)}
                    max={12}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-20 text-right">{dailyLimit} classes</span>
                </div>
              </div>
              <div>
                <Label>Buffer Time</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    value={[bufferTime]}
                    onValueChange={(value) => setBufferTime(value?.[0] ?? 15)}
                    max={60}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-20 text-right">{bufferTime} min</span>
                </div>
              </div>
            </div>
          </MotionCard>

          {/* Notifications Card */}
          <MotionCard
            className="p-6 bg-card shadow-xl"
            variants={scaleIn}
            whileHover={cardHover.whileHover}
            whileTap={cardHover.whileTap}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Bell className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={handleNotificationToggle}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Receive reminders about upcoming classes and schedule changes
              </p>
              {notifications && (
                <motion.div
                  className="space-y-2 pt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={handleEmailNotificationToggle}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <Switch
                      id="sms-notifications"
                      checked={smsNotifications}
                      onCheckedChange={handleSMSNotificationToggle}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </MotionCard>
        </motion.div>

        {/* Calendar Preview */}
        <MotionCard
          className="mt-8 p-6 bg-card shadow-xl"
          variants={scaleIn}
          whileHover={cardHover.whileHover}
          whileTap={cardHover.whileTap}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <CalendarIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Calendar Preview</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex justify-center lg:justify-start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Upcoming Classes</h3>
              <motion.div
                className="space-y-2"
                variants={staggerChildren}
              >
                {classes.map((classItem) => (
                  <motion.div
                    key={classItem.id}
                    className="flex items-center justify-between p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
                    variants={slideIn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div>
                      <p className="font-medium">{classItem.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {classItem.day}, {classItem.time}
                      </p>
                    </div>
                    <Badge>{classItem.status}</Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </MotionCard>
      </div>
    </motion.div>
  );
}