import { TestBed } from '@angular/core/testing';

import { HomeWorkService } from './home-work.service';

describe('HomeWorkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeWorkService = TestBed.get(HomeWorkService);
    expect(service).toBeTruthy();
  });
});
