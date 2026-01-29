import { Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';
import { LoggerService } from '@core/services/logger.service';

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
    protected hidePassword = true;
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);
    /**
     * Logger service instance.
     */
    private logger = inject(LoggerService);

    protected readonly loginForm = this.fb.nonNullable.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    /**
     * Handles the login form submission, authenticates the user,
     * and redirects to the employees dashboard upon success.
     */
    protected onSubmit(): void {
        if (!this.loginForm.valid || this.loginForm.pristine) {
            return;
        }

        const { username, password } = this.loginForm.getRawValue();
        this.router.navigate(['employees/list']);
        this.authService.login(username, password)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response) => {
                    this.router.navigate(['employees']);
                },
                error: (error) => {
                    this.logger.error('Login failed:', error);
                }
            });
    }
}
