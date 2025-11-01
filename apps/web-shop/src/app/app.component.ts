import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/services/i18n.service';
import { HeaderComponent } from './shared/components/header.component';
import { FooterComponent } from './shared/components/footer.component';
import { NotificationComponent } from './shared/components/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- Header -->
      <app-header></app-header>

      <!-- Main content -->
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <app-footer></app-footer>

      <!-- Global Notifications -->
      <app-notification></app-notification>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Loja Africana Rosa';

  constructor(private i18nService: I18nService) {}

  ngOnInit(): void {
    this.i18nService.init();
  }
}
