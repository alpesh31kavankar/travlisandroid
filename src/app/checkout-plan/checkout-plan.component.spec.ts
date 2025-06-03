import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPlanComponent } from './checkout-plan.component';

describe('CheckoutPlanComponent', () => {
  let component: CheckoutPlanComponent;
  let fixture: ComponentFixture<CheckoutPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
