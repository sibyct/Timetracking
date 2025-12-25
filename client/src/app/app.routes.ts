import { Routes } from '@angular/router';
import { LoginComponent } from '@features/auth';
import { MainLayoutComponent } from '@layout/main-layout/main-layout.component';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { ProjectListComponent } from '@features/projects/project-list/project-list.component';
import { APP_ROUTES } from '@shared/constants/routes';

export const routes: Routes = [
    { path: '', redirectTo: APP_ROUTES.LOGIN, pathMatch: 'full' },
    { path: APP_ROUTES.LOGIN, component: LoginComponent },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: APP_ROUTES.DASHBOARD, component: DashboardComponent },
            { path: APP_ROUTES.PROJECTS, component: ProjectListComponent }
        ]
    }
];
