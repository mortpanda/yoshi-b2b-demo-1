import { TestBed } from '@angular/core/testing';

import { OktaAddAppsService } from './okta-add-apps.service';

describe('OktaAddAppsService', () => {
  let service: OktaAddAppsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaAddAppsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
