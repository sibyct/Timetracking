import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileCardComponent } from '@features/employees/components/profile-card/profile-card.component';
@Component({
  selector: 'time-tracker-profile-view',
  standalone: true,
  imports: [MatButtonModule, MatTabsModule, ProfileCardComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {

}
