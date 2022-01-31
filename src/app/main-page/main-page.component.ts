import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { MatSnackBar } from '@angular/material/snack-bar';
import { OktaConfigService } from "app/shared/okta/okta-config.service";
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OktaGetAppService } from 'app/shared/okta/okta-get-app.service';
import { GetUserinfoService } from 'app/shared/okta/get-userinfo.service';
import { OktaApiEndpoints } from 'app/shared/okta/okta-api-endpoints';
import { ResetPwComponent } from 'app/reset-pw/reset-pw.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OktaRemoveAppService } from 'app/shared/okta/okta-remove-app.service';
import { OktaAddAppsService } from 'app/shared/okta/okta-add-apps.service';
;
import {RemoveUserModalComponent} from 'app/remove-user-modal/remove-user-modal.component'
import {AddUserModalComponent} from 'app/add-user-modal/add-user-modal.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {

  strThisSession;
  strUserSession: Boolean;
  arrApps: any = {};
  arrApplicationInfo: any = [];
  strAppLabelForDashboard;
  arrAppsToDel = [];
  arrGroupId = [];
  arrGroupsToAddTo = [];
  public authService = new OktaAuth(this.OktaSDKAuthService.config);

  constructor(
    public OktaGetTokenService: OktaGetTokenService,
    public OktaSDKAuthService: OktaSDKAuthService,
    public OktaGetAppService: OktaGetAppService,
    public GetUserinfoService: GetUserinfoService,
    public OktaConfigService: OktaConfigService,
    public OktaApiEndpoints: OktaApiEndpoints,
    public ResetPwComponent: ResetPwComponent,
    public _matdialog: MatDialog,
    public OktaRemoveAppService: OktaRemoveAppService,
    public OktaAddAppsService: OktaAddAppsService,
    private _snackBar: MatSnackBar,
    public RemoveUserModalComponent:RemoveUserModalComponent,
    public AddUserModalComponent:AddUserModalComponent,
  ) { }

  async RemoveAppDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "remove-app-component";
    // dialogConfig.height = "270px";
    // dialogConfig.width = "400px";

    const dialogRef = this._matdialog.open(RemoveUserModalComponent, dialogConfig);
  }

  async AddAppDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "add-app-component";
    // dialogConfig.height = "270px";
    // dialogConfig.width = "400px";

    const dialogRef = this._matdialog.open(AddUserModalComponent, dialogConfig);
    
  }


  async AddApps() {
    //this._snackBar.open('アプリを処理してます・・・');
    this.AddAppDialog();
    var intAppGroups
    intAppGroups = 0;
    this.authService.token.getUserInfo()
      .then(function (user) {
        //console.log(user)
      })
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          return exists
        } else {
          // not logged in
          return exists
        }
      });
    switch (this.strUserSession == true) {
      case false:
        await window.location.replace(this.OktaConfigService.strPostLogoutURL);
      case true:
        await this.OktaGetTokenService.GetAccessToken();
        await this.OktaGetAppService.ListApps(this.OktaGetTokenService.myAccessToken.accessToken);
        for (var a = 0; a < this.OktaGetAppService.colActiveApps.length; a++) {
          //filter for "b2b_enabled_..."
          switch (this.OktaGetAppService.colActiveApps[a].label.substring(0, 12).toLowerCase()) {
            case "b2b_enabled_": {
              console.log(this.OktaGetAppService.colActiveApps[a].label + ' : ' + this.OktaGetAppService.colActiveApps[a].id);
              await this.OktaAddAppsService.GetAppGroups(this.OktaGetAppService.colActiveApps[a]._links.groups.href, this.OktaGetTokenService.myAccessToken.accessToken)
              for (var b = 0; b < this.OktaAddAppsService.arrActiveAppGroups.length; b++) {
                this.arrGroupsToAddTo[intAppGroups] = this.OktaAddAppsService.arrActiveAppGroups[b].id;
              }
              intAppGroups = Number(intAppGroups + 1);
            }
          }
        }
    }
    //Array contains APP group IDs to process
    console.log(this.arrGroupsToAddTo)
    for (var c = 0; c < this.arrGroupsToAddTo.length; c++) {
      console.log(this.arrGroupsToAddTo[c])
      await this.OktaAddAppsService.AddToGroup(this.arrGroupsToAddTo[c], this.OktaGetTokenService.strUid, this.OktaGetTokenService.myAccessToken.accessToken)
    }
    this._snackBar.dismiss();
    window.location.replace(this.OktaConfigService.strRedirectURL);
  }

  async DelApps() {
    // this._snackBar.open('アプリを処理してます・・・');
    this.RemoveAppDialog();
    await this.OktaGetTokenService.GetAccessToken();
    this.arrAppsToDel = JSON.parse(localStorage.getItem('okta_my_apps'));
    for (var app = 0; app < this.arrAppsToDel.length; app++) {
      switch (this.arrAppsToDel[app].appLabel.substring(0, 26).toLowerCase()) {
        case "angular - ciam demo portal": {
          await this.OktaRemoveAppService.GetAppGroups(this.arrAppsToDel[app].appGroups, this.OktaGetTokenService.myAccessToken.accessToken)
          for (var p = 0; p < this.OktaRemoveAppService.arrAppGroups.length; p++) {
            this.arrGroupId[app] = this.OktaRemoveAppService.arrAppGroups[p].id
            console.log(this.arrGroupId[app])
            await this.OktaRemoveAppService.RemoveFromGroup(this.arrGroupId[app], this.OktaGetTokenService.strUid, this.OktaGetTokenService.myAccessToken.accessToken);
          }
        }
      }
    }
    this._snackBar.dismiss();
    window.location.replace(this.OktaConfigService.strRedirectURL);
  }

  async ngOnInit() {

    this.authService.token.getUserInfo()
      .then(function (user) {
        //console.log(user)
      })
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          return exists
        } else {
          // not logged in
          return exists
        }
      });
    switch (this.strUserSession == true) {
      case false:
        //alert(this.oktaSDKAuth.config.redirectUri)
        // alert('ログインしてください')
        //await this.NotAuthed();
        await window.location.replace('/');
      case true:
        await this.OktaGetTokenService.GetAccessToken();
        await this.OktaGetAppService.GetMyApps(this.OktaGetTokenService.strUid, this.OktaGetTokenService.myAccessToken.accessToken);
        await this.ProcessApps(this.OktaGetAppService.intAppArrayLength);
        this.strThisSession = await this.authService.token.getWithoutPrompt();
        this.GetUserinfoService.GetMe(this.OktaConfigService.strBaseURI + this.OktaApiEndpoints.strUserMe, this.strThisSession.tokens.accessToken.accessToken);
        break;

    }
  }

  // pwReset() {
  //   const pwResetDialog = new MatDialogConfig();
  //   // 表示するdialogの設定
  //   pwResetDialog.disableClose = false;
  //   pwResetDialog.id = "pwResetDialog-modal-component";
  //   // RegisterDialogConfig.height = "700px";
  //   // RegisterDialogConfig.width = "450px";
  //   const modalDialog = this._matdialog.open(ResetPwComponent, pwResetDialog);
  // }


  ProcessApps(arrLength) {
    localStorage.removeItem('okta_my_apps');
    this.arrApps = this.OktaGetAppService.colMyAppList;
    let arrayInt = 0;  //For the array which will hold the application information
    for (var i = 0; i < arrLength; i++) {

      switch (this.arrApps[i].status.toLowerCase()) {
        //Filter out any INACTIVE Apps
        case "active":
          //Filter out for only OIDC apps
          switch (this.arrApps[i].name.toLowerCase()) {
            case "oidc_client":
              //console.log(this.arrApps[i].label.substring(0, 9))
              //Filter out any non "Angular" apps
              switch (this.arrApps[i].label.substring(0, 12)) {
                case "b2b_enabled_":
                  //console.log(this.arrApps[i]);
                  try {
                    this.strAppLabelForDashboard = this.arrApps[i].label.substring(12, 255);
                    // console.log(this.strAppLabelForDashboard)
                    //console.log(this.arrApps[i].label + " : " + this.arrApps[i].settings.oauthClient.initiate_login_uri + " : " + this.arrApps[i]._links.logo[0].href);
                    console.log(this.strAppLabelForDashboard + " : " + this.arrApps[i].settings.oauthClient.initiate_login_uri + " : " + this.arrApps[i]._links.logo[0].href);
                    //Add the application information into the Array
                    this.arrApplicationInfo[arrayInt] = {
                      appId: this.arrApps[i].id,
                      appGroups: this.arrApps[i]._links.groups.href,
                      appLabel: this.strAppLabelForDashboard,
                      appSignonURI: this.arrApps[i].settings.oauthClient.initiate_login_uri,
                      appImage: this.arrApps[i]._links.logo[0].href,
                    }
                    //console.log(this.arrApplicationInfo[i]);
                    arrayInt = arrayInt + 1;
                  } catch (e) { }
                  break;
              }
          }
          break;
      }
    }
    console.log(Array.isArray(this.arrApplicationInfo))
    console.log(this.arrApplicationInfo)
    localStorage.setItem('okta_my_apps', JSON.stringify(this.arrApplicationInfo));
  }
}

