import { TestBed } from '@angular/core/testing';

import { OktaResetPwEmailService } from './okta-reset-pw-email.service';

describe('OktaResetPwEmailService', () => {
  let service: OktaResetPwEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaResetPwEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
