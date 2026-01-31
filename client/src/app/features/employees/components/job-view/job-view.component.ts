import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ReadonlyFieldComponent } from '@shared/components/readonly-field/readonly-field.component';
@Component({
  selector: 'time-tracker-job-view',
  standalone: true,
  imports: [MatCardModule, ReadonlyFieldComponent],
  templateUrl: './job-view.component.html',
  styleUrl: './job-view.component.scss'
})
export class JobViewComponent {

}
