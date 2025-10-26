import { TestBed } from '@angular/core/testing';

import { T3Controller } from './t3-controller';

describe('T3Controller', () => {
  let service: T3Controller;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(T3Controller);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
