import { TestBed } from '@angular/core/testing';

import { CantonesService } from './cantones.service';

describe('CantonesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CantonesService = TestBed.get(CantonesService);
    expect(service).toBeTruthy();
  });
});
