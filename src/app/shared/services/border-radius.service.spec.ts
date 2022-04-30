import { TestBed } from '@angular/core/testing';

import { BorderRadiusService } from './border-radius.service';

describe('BorderRadiusService', () => {
  let service: BorderRadiusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorderRadiusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
