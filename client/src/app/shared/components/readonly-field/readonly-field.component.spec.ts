import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyFieldComponent } from './readonly-field.component';

describe('ReadonlyFieldComponent', () => {
  let component: ReadonlyFieldComponent;
  let fixture: ComponentFixture<ReadonlyFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadonlyFieldComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReadonlyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ReadonlyFieldComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label')?.textContent).toBe('Test Label');
  });

  it('should render the value', () => {
    fixture.componentRef.setInput('value', 'Test Value');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.value-text')?.textContent).toBe('Test Value');
  });
});
