import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageCalculatorComponent } from './average-calculator.component';

describe('AverageCalculatorComponent', () => {
  let component: AverageCalculatorComponent;
  let fixture: ComponentFixture<AverageCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
