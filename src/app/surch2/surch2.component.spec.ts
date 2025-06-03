import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Surch2Component } from './surch2.component';

describe('Surch2Component', () => {
  let component: Surch2Component;
  let fixture: ComponentFixture<Surch2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Surch2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Surch2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
