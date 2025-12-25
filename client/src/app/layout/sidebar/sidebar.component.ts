import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'time-tracker-sidebar',
    standalone: true,
    imports: [CommonModule, MatListModule, MatIconModule, RouterModule, MatTooltipModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    collapsed = input<boolean>(false);
    protected navItems = [
        { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
        { label: 'Employees', icon: 'groups', route: '/employees' },
    ];
}
