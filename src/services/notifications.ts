import { toast } from 'sonner';

export type NotificationType = 'email' | 'sms' | 'push';
export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  scheduledFor: Date;
}

class NotificationService {
  private static instance: NotificationService;
  private notifications: Map<string, Notification>;
  private notificationTimers: Map<string, NodeJS.Timeout>;

  private constructor() {
    this.notifications = new Map();
    this.notificationTimers = new Map();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public scheduleNotification(notification: Omit<Notification, 'id'>): string {
    const id = crypto.randomUUID();
    const newNotification: Notification = {
      ...notification,
      id,
    };

    this.notifications.set(id, newNotification);

    const now = new Date();
    const delay = notification.scheduledFor.getTime() - now.getTime();

    if (delay > 0) {
      const timer = setTimeout(() => {
        this.sendNotification(newNotification);
      }, delay);

      this.notificationTimers.set(id, timer);
    } else {
      this.sendNotification(newNotification);
    }

    return id;
  }

  public cancelNotification(id: string): boolean {
    const timer = this.notificationTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.notificationTimers.delete(id);
      this.notifications.delete(id);
      return true;
    }
    return false;
  }

  private async sendNotification(notification: Notification): Promise<void> {
    // Show in-app notification
    toast(notification.title, {
      description: notification.message,
      duration: 5000,
    });

    // Handle different notification types
    switch (notification.type) {
      case 'email':
        await this.sendEmailNotification(notification);
        break;
      case 'sms':
        await this.sendSMSNotification(notification);
        break;
      case 'push':
        await this.sendPushNotification(notification);
        break;
    }

    // Clean up after sending
    this.notifications.delete(notification.id);
    this.notificationTimers.delete(notification.id);
  }

  private async sendEmailNotification(notification: Notification): Promise<void> {
    // TODO: Implement email notification using your preferred email service
    console.log('Sending email notification:', notification);
  }

  private async sendSMSNotification(notification: Notification): Promise<void> {
    // TODO: Implement SMS notification using your preferred SMS service
    console.log('Sending SMS notification:', notification);
  }

  private async sendPushNotification(notification: Notification): Promise<void> {
    // TODO: Implement push notification using your preferred push notification service
    console.log('Sending push notification:', notification);
  }

  public getScheduledNotifications(): Notification[] {
    return Array.from(this.notifications.values());
  }
}

export const notificationService = NotificationService.getInstance();