import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'time-tracker-header',
    standalone: true,
    imports: [CommonModule, MatToolbarModule,
        MatButtonModule, MatIconModule,
        MatFormFieldModule, MatInputModule
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    readonly toggleSidebar = output<void>();

    onToggleSidebar() {
        this.toggleSidebar.emit();
    }
}
