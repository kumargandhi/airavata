import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateStepComponent } from './estimate-step.component';

describe('EstimateStepComponent', () => {
  let component: EstimateStepComponent;
  let fixture: ComponentFixture<EstimateStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimateStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimateStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
