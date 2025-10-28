import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
  dismissible?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();
  private notificationCounter = 0;

  constructor() {}

  /**
   * Show success notification
   */
  success(message: string, duration: number = 3000): void {
    this.show(message, 'success', duration);
  }

  /**
   * Show error notification
   */
  error(message: string, duration: number = 5000): void {
    this.show(message, 'error', duration);
  }

  /**
   * Show warning notification
   */
  warning(message: string, duration: number = 4000): void {
    this.show(message, 'warning', duration);
  }

  /**
   * Show info notification
   */
  info(message: string, duration: number = 3000): void {
    this.show(message, 'info', duration);
  }

  /**
   * Show notification with custom type
   */
  show(message: string, type: NotificationType = 'info', duration: number = 3000): void {
    const id = `notification-${++this.notificationCounter}`;
    const notification: Notification = {
      id,
      message,
      type,
      duration,
      dismissible: true
    };

    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([...current, notification]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  /**
   * Dismiss notification by ID
   */
  dismiss(id: string): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next(current.filter(n => n.id !== id));
  }

  /**
   * Clear all notifications
   */
  clearAll(): void {
    this.notificationsSubject.next([]);
  }

  /**
   * Get current notifications
   */
  getNotifications(): Notification[] {
    return this.notificationsSubject.value;
  }
}
