import { TestBed } from '@angular/core/testing';

import { HandleErrorService } from './handle-error.service';

describe('HandleErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandleErrorService = TestBed.get(HandleErrorService);
    expect(service).toBeTruthy();
  });
});
