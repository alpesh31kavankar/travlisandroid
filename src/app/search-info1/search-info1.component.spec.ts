import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInfo1Component } from './search-info1.component';

describe('SearchInfo1Component', () => {
  let component: SearchInfo1Component;
  let fixture: ComponentFixture<SearchInfo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInfo1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInfo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
