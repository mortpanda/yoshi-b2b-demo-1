import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import {OktaConfigService} from 'app/shared/okta/okta-config.service';
import {OktaResetPwEmailService} from 'app/shared/okta/okta-reset-pw-email.service';

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrls: ['./reset-pw.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPwComponent implements OnInit {


  constructor(
    private Location: Location,
    public OktaConfigService: OktaConfigService,
    public OktaResetPwEmailService:OktaResetPwEmailService,
  ) { }

  GoBack() {
    window.location.replace(this.OktaConfigService.strRedirectURL);
  }

  pwReset(){

  }

  ngOnInit() {
  }

}
