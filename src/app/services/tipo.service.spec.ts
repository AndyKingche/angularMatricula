import { TestBed } from '@angular/core/testing';

import { TipoService } from './tipo.service';

describe('TipoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoService = TestBed.get(TipoService);
    expect(service).toBeTruthy();
  });
});
