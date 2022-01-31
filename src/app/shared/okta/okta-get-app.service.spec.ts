import { TestBed } from '@angular/core/testing';

import { OktaGetAppService } from './okta-get-app.service';

describe('OktaGetAppService', () => {
  let service: OktaGetAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaGetAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
