import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreGeneratorComponent } from './score-generator.component';

describe('ScoreGeneratorComponent', () => {
  let component: ScoreGeneratorComponent;
  let fixture: ComponentFixture<ScoreGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
