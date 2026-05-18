import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCubes, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  showSidebar = signal(false);
  faLayerGroup = faLayerGroup;
  faCubes = faCubes;
  private route = inject(ActivatedRoute);
  router = inject(Router);
  toggleSidebar() {
    this.showSidebar.update((value) => !value);
  }
}
