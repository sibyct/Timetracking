import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

export interface Employee {
  name: string;
  position: string;
  department: string;
  email: string;
  id: string;
  photo?: string;
}

@Component({
  selector: 'time-tracker-employee-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss'
})
export class EmployeeCardComponent {
  employee = input<Employee>();
}
