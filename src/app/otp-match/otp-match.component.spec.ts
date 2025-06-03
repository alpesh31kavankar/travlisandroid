import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpMatchComponent } from './otp-match.component';

describe('OtpMatchComponent', () => {
  let component: OtpMatchComponent;
  let fixture: ComponentFixture<OtpMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
