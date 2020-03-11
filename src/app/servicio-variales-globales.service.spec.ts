import { TestBed } from '@angular/core/testing';

import { ServicioVarialesGlobalesService } from './servicio-variales-globales.service';

describe('ServicioVarialesGlobalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioVarialesGlobalesService = TestBed.get(ServicioVarialesGlobalesService);
    expect(service).toBeTruthy();
  });
});
