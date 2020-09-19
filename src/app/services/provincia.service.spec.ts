import { TestBed } from '@angular/core/testing';

import { ProvinciaService } from './provincia.service';

describe('ProvinciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvinciaService = TestBed.get(ProvinciaService);
    expect(service).toBeTruthy();
  });
});
