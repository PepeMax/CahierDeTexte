import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfosComponent } from './userinfos.component';

describe('UserinfosComponent', () => {
  let component: UserinfosComponent;
  let fixture: ComponentFixture<UserinfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserinfosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
