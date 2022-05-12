import { TestBed } from '@angular/core/testing';
import { MockBorder } from '../mock/border.mock';

import { BorderRadiusService } from './border-radius.service';

fdescribe('BorderRadiusService', () => {
  let service: BorderRadiusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorderRadiusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return borderRadiusString anyway on getBorderRadiusString', () => {
    const response = service.getBorderRadiusString();

    expect(response).toEqual(MockBorder.radius);
  });

  it('should return default value for null params on generateRandomRadiusValues', () => {
    // continue here
  });
});
