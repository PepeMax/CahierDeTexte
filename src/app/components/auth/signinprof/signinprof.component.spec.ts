import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninProfComponent } from './signinprof.component';

describe('SigninProfComponent', () => {
  let component: SigninProfComponent;
  let fixture: ComponentFixture<SigninProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninProfComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
