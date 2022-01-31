import { Component, OnInit } from '@angular/core';
import { OktaWidgetService } from 'app/shared/okta/okta-widget.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth} from '@okta/okta-auth-js'
import { MatSnackBar } from '@angular/material/snack-bar';
import { OktaConfigService } from "app/shared/okta/okta-config.service";
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {
  private authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  constructor(private OktaWidgetService: OktaWidgetService, private OktaSDKAuthService: OktaSDKAuthService, private _snackBar: MatSnackBar, public OktaConfig:OktaConfigService) { }

  async ngOnInit()  {
    
    this.OktaWidgetService.CloseWidget();
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          console.log('Session to Okta : ' + exists);
          return exists
        } else {
          // not logged in
          console.log('Session to Okta : ' + exists);
          return exists
        }
      });
    switch (this.strUserSession) {
      case false:
        this.OktaWidgetService.login();
        break;

      case true:
        window.location.replace(this.OktaSDKAuthService.config.redirectUri);
        break;

    }
  }

}
