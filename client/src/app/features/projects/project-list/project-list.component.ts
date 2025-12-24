import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Project } from '../../../core/models/project.model';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
    selector: 'time-tracker-project-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
    displayedColumns: string[] = ['name', 'client', 'type', 'startDate', 'status', 'actions'];
    projects = signal<Project[]>([
        { id: 1, name: 'Website Redesign', client: 'Acme Corp', type: 'Design', startDate: new Date('2024-01-15'), status: 'Ongoing' },
        { id: 2, name: 'Mobile App', client: 'Globex', type: 'Development', startDate: new Date('2024-02-01'), status: 'On Hold' },
        { id: 3, name: 'Marketing Campaign', client: 'Soylent Corp', type: 'Marketing', startDate: new Date('2024-03-10'), status: 'Completed' }
    ]);

    private dialog = inject(MatDialog);

    onAddProject() {
        const dialogRef = this.dialog.open(ProjectFormComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.projects.update(projects => [...projects, { ...result, id: projects.length + 1 }]);
            }
        });
    }
}
