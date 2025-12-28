import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'time-tracker-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    protected readonly loginForm: FormGroup;
    protected hidePassword = true;
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    constructor(
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (!this.loginForm.valid) {
            return;
        }

        const { username, password } = this.loginForm.value;

        // this.authService.login(username, password).subscribe({
        //     next: () => {
        //         this.router.navigate(['/dashboard']);
        //     },
        //     error: (error) => {
        //         console.error('Login failed:', error);
        //     }
        // });
    }
}
