import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateservicesComponent } from './updateservices.component';

describe('UpdateservicesComponent', () => {
  let component: UpdateservicesComponent;
  let fixture: ComponentFixture<UpdateservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateservicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
