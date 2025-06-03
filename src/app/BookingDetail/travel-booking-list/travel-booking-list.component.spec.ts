import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelBookingListComponent } from './travel-booking-list.component';

describe('TravelBookingListComponent', () => {
  let component: TravelBookingListComponent;
  let fixture: ComponentFixture<TravelBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelBookingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
