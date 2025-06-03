import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHotelComponent } from './user-profile1.component';

describe('AllHotelComponent', () => {
  let component: AllHotelComponent;
  let fixture: ComponentFixture<AllHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
