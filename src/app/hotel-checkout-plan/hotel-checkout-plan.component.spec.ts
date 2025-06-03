import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCheckoutPlanComponent } from './hotel-checkout-plan.component';

describe('HotelCheckoutPlanComponent', () => {
  let component: HotelCheckoutPlanComponent;
  let fixture: ComponentFixture<HotelCheckoutPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelCheckoutPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelCheckoutPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
