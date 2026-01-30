import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileCardComponent } from '@features/employees/components/profile-card/profile-card.component';
import { JobViewComponent } from '@features/employees/components/job-view/job-view.component';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'time-tracker-profile-view',
  standalone: true,
  imports: [MatButtonModule, MatTabsModule, ProfileCardComponent, JobViewComponent, MatToolbarModule],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {

}
