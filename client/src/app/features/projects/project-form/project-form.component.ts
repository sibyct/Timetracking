import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'time-tracker-project-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule
    ],
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {
    projectForm: FormGroup;

    types = ['Design', 'Development', 'Marketing', 'Consulting', 'Other'];
    statuses = ['Ongoing', 'On Hold', 'Completed'];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ProjectFormComponent>
    ) {
        this.projectForm = this.fb.group({
            name: ['', Validators.required],
            client: ['', Validators.required],
            type: ['', Validators.required],
            startDate: [new Date(), Validators.required],
            endDate: [null],
            status: ['Ongoing', Validators.required]
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.projectForm.valid) {
            this.dialogRef.close(this.projectForm.value);
        }
    }
}
