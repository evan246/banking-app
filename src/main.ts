import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgxEchartsModule } from 'ngx-echarts';
import { routes } from './app/app.routes';
import { NavbarComponent } from './app/shared/components/navbar/navbar.component';
import { SidebarComponent } from './app/shared/components/sidebar/sidebar.component';
import { AuthService } from './app/core/services/auth.service';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzLayoutModule,
    NavbarComponent,
    SidebarComponent
  ],
  template: `
    <div *ngIf="!isLoginPage; else loginTemplate">
      <nz-layout class="app-layout">
        <app-navbar></app-navbar>
        <nz-layout>
          <app-sidebar></app-sidebar>
          <nz-layout class="main-layout">
            <nz-content class="main-content">
              <router-outlet></router-outlet>
            </nz-content>
          </nz-layout>
        </nz-layout>
      </nz-layout>
    </div>
    <ng-template #loginTemplate>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .app-layout { min-height: 100vh; }
    /* App-level styles kept minimal; layout handled by main-layout component */
  `]
})
export class App implements OnInit {
  isLoginPage = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialize immediately (handles reloads / direct navigation)
    this.isLoginPage = this.router.url === '/login';

    // Update on navigation end events
    this.router.events.subscribe(event => {
      // Router.url may change on various events; check final URL
      this.isLoginPage = this.router.url === '/login';
    });
  }
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideNzI18n(en_US),
    provideNzIcons(icons),
    importProvidersFrom(
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
      })
    )
  ]
}).catch(err => console.error(err));
