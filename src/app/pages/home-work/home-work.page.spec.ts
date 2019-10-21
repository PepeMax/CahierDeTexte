import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWorkPage } from './home-work.page';

describe('HomeWorkPage', () => {
  let component: HomeWorkPage;
  let fixture: ComponentFixture<HomeWorkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeWorkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWorkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
