import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkOrderComponent } from './add-edit-work-order.component';

describe('AddEditWorkOrderComponent', () => {
  let component: AddEditWorkOrderComponent;
  let fixture: ComponentFixture<AddEditWorkOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWorkOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
