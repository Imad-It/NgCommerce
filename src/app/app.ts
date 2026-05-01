import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarCompoent } from './core/layout/sidebar/sidebar.compoent';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SidebarCompoent, SpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('NgCommerce');
  loadingService = inject(LoadingService);
}
