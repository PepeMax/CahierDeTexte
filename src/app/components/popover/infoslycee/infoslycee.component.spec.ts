import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoslyceeComponent } from './infoslycee.component';

describe('InfoslyceeComponent', () => {
  let component: InfoslyceeComponent;
  let fixture: ComponentFixture<InfoslyceeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoslyceeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoslyceeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
