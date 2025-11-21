import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NavbarComponent,
    SidebarComponent
  ],
  template: `
    <div class="app-grid">
      <header class="app-header">
        <app-navbar></app-navbar>
      </header>

      <aside class="app-sidebar">
        <app-sidebar></app-sidebar>
      </aside>

      <main class="app-main">
        <div class="main-inner">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; }

    .app-grid {
      display: grid;
      grid-template-columns: 240px 1fr;
      grid-template-rows: 64px 1fr;
      grid-template-areas:
        "header header"
        "sidebar main";
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    .app-header { grid-area: header; }
    .app-sidebar { grid-area: sidebar; height: calc(100vh - 64px); overflow-y: auto; }
    .app-main { grid-area: main; overflow-y: auto; background: var(--light-gray); padding: 24px; }

    .main-inner { max-width: 1180px; margin: 0 auto; }

    @media (max-width: 900px) {
      .app-grid { grid-template-columns: 1fr; grid-template-rows: 64px auto 1fr; grid-template-areas: "header" "sidebar" "main"; }
      .app-sidebar { grid-row: 2 / 3; grid-column: 1 / -1; height: auto; }
      .app-main { grid-row: 3 / 4; grid-column: 1 / -1; padding: 16px; }
    }
  `]
})
export class MainLayoutComponent {}
