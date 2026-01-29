import { Routes } from '@angular/router';
import { LoginComponent } from '@features/auth';
import { MainLayoutComponent } from '@layout/main-layout/main-layout.component';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { EmployeeListComponent } from '@features/employees';
import { APP_ROUTES } from '@shared/constants/routes';
import { ProfileViewComponent } from '@features/employees/pages/profile-view/profile-view.component';

export const routes: Routes = [
    { path: '', redirectTo: APP_ROUTES.LOGIN, pathMatch: 'full' },
    { path: APP_ROUTES.LOGIN, component: LoginComponent },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: APP_ROUTES.DASHBOARD, component: DashboardComponent },
            { path: APP_ROUTES.EMPLOYEES, redirectTo: APP_ROUTES.EMPLOYEES + '/list' },
            { path: APP_ROUTES.EMPLOYEES + '/list', component: EmployeeListComponent },
            { path: APP_ROUTES.EMPLOYEES + '/profile/:employeeId', component: ProfileViewComponent }
        ]
    }
];
