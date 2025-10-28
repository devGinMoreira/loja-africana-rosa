import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      <div *ngFor="let notification of notifications$ | async as notifications" 
           [ngClass]="getNotificationClasses(notification)"
           class="p-4 rounded-lg shadow-lg flex items-center justify-between animate-slideIn">
        <div class="flex items-center gap-3">
          <span [ngClass]="getIconClass(notification.type)">
            {{ getIcon(notification.type) }}
          </span>
          <p class="text-sm font-medium">{{ notification.message }}</p>
        </div>
        <button 
          *ngIf="notification.dismissible"
          (click)="dismiss(notification.id)"
          class="text-lg hover:opacity-70 transition">
          ×
        </button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .animate-slideIn {
      animation: slideIn 0.3s ease-out;
    }
  `]
})
export class NotificationComponent implements OnInit {
  notifications$!: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications$ = this.notificationService.notifications$;
  }

  dismiss(id: string): void {
    this.notificationService.dismiss(id);
  }

  getNotificationClasses(notification: Notification): string {
    const baseClasses = 'text-white';
    switch (notification.type) {
      case 'success':
        return `${baseClasses} bg-green-500`;
      case 'error':
        return `${baseClasses} bg-red-500`;
      case 'warning':
        return `${baseClasses} bg-yellow-500`;
      case 'info':
      default:
        return `${baseClasses} bg-blue-500`;
    }
  }

  getIconClass(type: string): string {
    return 'text-xl font-bold';
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  }
}
