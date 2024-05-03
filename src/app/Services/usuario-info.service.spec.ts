import { TestBed } from '@angular/core/testing';

import { UsuarioInfoService } from './usuario-info.service';

describe('UsuarioInfoService', () => {
  let service: UsuarioInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
