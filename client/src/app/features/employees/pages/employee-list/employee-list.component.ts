import { Component, inject } from '@angular/core';
import { EmployeeCardComponent, Employee } from '@features/employees/components/employee-card/employee-card.component';
import { MatButtonModule } from '@angular/material/button';
import { AddEmployeeComponent } from '@features/employees/components/add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { ActionBarComponent } from '@shared/components/action-bar/action-bar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'time-tracker-employee-list',
  standalone: true,
  imports: [EmployeeCardComponent, MatButtonModule, AddEmployeeComponent, ActionBarComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  employees: Employee[] = [

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
    },
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
    },
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
  private router = inject(Router);

  private dialog = inject(MatDialog);

  protected openAddEmployeeDialog() {
    this.dialog.open(AddEmployeeComponent, {
      width: '400px',
      height: '90vh',
      position: { right: '0', bottom: '0' },
      panelClass: 'right-side-dialog', // Use the class we defined above

      /* Disable default scaling animation */
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }

  protected openProfileView(id: string) {
    this.router.navigate([`/employees/profile/${id}`]);
  }
}
