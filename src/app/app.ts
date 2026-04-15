import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarCompoent } from './components/sidebar/sidebar.compoent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SidebarCompoent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('NgCommerce');
}
