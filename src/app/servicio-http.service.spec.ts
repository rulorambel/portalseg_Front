import { TestBed } from '@angular/core/testing';

import { ServicioHttpService } from './servicio-http.service';

describe('ServicioHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioHttpService = TestBed.get(ServicioHttpService);
    expect(service).toBeTruthy();
  });
});
