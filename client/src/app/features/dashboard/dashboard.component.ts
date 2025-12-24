import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'time-tracker-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Dashboard</h1>
    <p>Welcome to the Time Tracker Dashboard.</p>
  `,
  styles: [`
    h1 { color: #333; }
  `]
})
export class DashboardComponent { }
