import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/services/i18n.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- Main content -->
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
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
