import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomeWorkPage } from './new-home-work.page';

describe('NewHomeWorkPage', () => {
  let component: NewHomeWorkPage;
  let fixture: ComponentFixture<NewHomeWorkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewHomeWorkPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomeWorkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
