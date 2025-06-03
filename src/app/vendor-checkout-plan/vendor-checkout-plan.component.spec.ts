import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCheckoutPlanComponent } from './vendor-checkout-plan.component';

describe('VendorCheckoutPlanComponent', () => {
  let component: VendorCheckoutPlanComponent;
  let fixture: ComponentFixture<VendorCheckoutPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCheckoutPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorCheckoutPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
