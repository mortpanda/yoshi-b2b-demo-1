import { TestBed } from '@angular/core/testing';

import { OktaRemoveAppService } from './okta-remove-app.service';

describe('OktaRemoveAppService', () => {
  let service: OktaRemoveAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaRemoveAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
