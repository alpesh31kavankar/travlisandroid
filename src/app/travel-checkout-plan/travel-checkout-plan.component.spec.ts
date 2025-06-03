import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelCheckoutPlanComponent } from './travel-checkout-plan.component';

describe('TravelCheckoutPlanComponent', () => {
  let component: TravelCheckoutPlanComponent;
  let fixture: ComponentFixture<TravelCheckoutPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelCheckoutPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelCheckoutPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
