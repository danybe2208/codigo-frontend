import { TestBed } from '@angular/core/testing';

import { CurtidaService } from './curtida.service';

describe('CurtidaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurtidaService = TestBed.get(CurtidaService);
    expect(service).toBeTruthy();
  });
});
