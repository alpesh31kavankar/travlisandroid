import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurchComponent } from './surch.component';

describe('SurchComponent', () => {
  let component: SurchComponent;
  let fixture: ComponentFixture<SurchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
