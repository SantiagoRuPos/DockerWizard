import { TestBed } from '@angular/core/testing';

import { CygnusService } from './cygnus.service';

describe('CygnusService', () => {
  let service: CygnusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CygnusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
