import { Component } from '@angular/core';
import { input } from '@angular/core';
@Component({
  selector: 'time-tracker-readonly-field',
  standalone: true,
  imports: [],
  templateUrl: './readonly-field.component.html',
  styleUrl: './readonly-field.component.scss'
})
export class ReadonlyFieldComponent {
  label = input<string>();
  value = input<string>();
}
