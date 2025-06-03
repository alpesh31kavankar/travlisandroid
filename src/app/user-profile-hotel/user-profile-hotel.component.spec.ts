import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileHotelComponent } from './user-profile-hotel.component';

describe('UserProfileHotelComponent', () => {
  let component: UserProfileHotelComponent;
  let fixture: ComponentFixture<UserProfileHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
