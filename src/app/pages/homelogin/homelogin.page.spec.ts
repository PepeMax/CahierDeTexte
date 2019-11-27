import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeloginPage } from './homelogin.page';

describe('HomeloginPage', () => {
  let component: HomeloginPage;
  let fixture: ComponentFixture<HomeloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeloginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
