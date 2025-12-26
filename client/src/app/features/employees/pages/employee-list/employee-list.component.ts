import { Component } from '@angular/core';
import { EmployeeCardComponent, Employee } from '@features/employees/components/employee-card/employee-card.component';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'time-tracker-employee-list',
  standalone: true,
  imports: [EmployeeCardComponent, MatButtonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  employees: Employee[] = [
    {
      name: 'John Doe',
      position: 'Software Engineer',
      department: 'Development',
      email: 'john.doe@example.com',
      id: '1',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Jane Smith',
      position: 'Project Manager',
      department: 'Management',
      email: 'jane.smith@example.com',
      id: '2',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      name: 'Michael Johnson',
      position: 'Senior Developer',
      department: 'Development',
      email: 'michael.johnson@example.com',
      id: '3',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      name: 'Emily Davis',
      position: 'Marketing Specialist',
      department: 'Marketing',
      email: 'emily.davis@example.com',
      id: '4',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      name: 'William Brown',
      position: 'QA Engineer',
      department: 'Quality Assurance',
      email: 'william.brown@example.com',
      id: '5',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  ];

}
