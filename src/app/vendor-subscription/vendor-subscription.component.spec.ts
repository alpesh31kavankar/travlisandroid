import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSubscriptionComponent } from './vendor-subscription.component';

describe('VendorSubscriptionComponent', () => {
  let component: VendorSubscriptionComponent;
  let fixture: ComponentFixture<VendorSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
