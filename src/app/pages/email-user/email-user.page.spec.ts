import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailUserPage } from './email-user.page';

describe('EmailUserPage', () => {
  let component: EmailUserPage;
  let fixture: ComponentFixture<EmailUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailUserPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
