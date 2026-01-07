import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'time-tracker-job-view',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './job-view.component.html',
  styleUrl: './job-view.component.scss'
})
export class JobViewComponent {

}
