import { Component, viewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'time-tracker-main-layout',
    standalone: true,
    imports: [
        CommonModule,
        MatSidenavModule,
        RouterModule,
        HeaderComponent,
        SidebarComponent
    ],
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
    readonly sidenav = viewChild.required<MatSidenav>('sidenav');
    readonly isCollapsed = signal(false);

    protected onToggleSidebar() {
        this.isCollapsed.update(val => !val);
    }
}
