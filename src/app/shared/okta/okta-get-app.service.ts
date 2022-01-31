import { Injectable } from '@angular/core';
import { OktaConfigService } from './okta-config.service';

@Injectable({
  providedIn: 'root'
})
export class OktaGetAppService {
  
  myAppURL = this.OktaConfigService.strBaseURI + 'api/v1/apps?filter=user.id+eq+\"';
  activeAppsURL = this.OktaConfigService.strBaseURI + 'api/v1/apps?filter=status+eq+"ACTIVE"';

  colMyAppList;
  intAppArrayLength;
  
  colActiveApps;
  activeAppsLength

  constructor(
    public OktaConfigService: OktaConfigService,
  ) { }

  async GetMyApps(userid, accesstoken) {
    const url = this.myAppURL + userid+ '\"&limit=200';
    console.log('calling : ' + url)
    const thisFetch = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accesstoken,
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
    this.colMyAppList = await thisFetch;
    // console.log('Getting my apps using service')
    // console.log(this.colMyAppList);
    this.intAppArrayLength = this.colMyAppList.length;
    // console.log(this.intAppArrayLength);
  }

  async ListApps(accesstoken) {
    const activeAppUrl = this.activeAppsURL+ '&limit=200';
    console.log( 'calling : ' + activeAppUrl)
    const thisFetch = fetch(activeAppUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accesstoken,
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
    this.colActiveApps = await thisFetch;
    // console.log('Getting my apps using service')
    // console.log(this.colMyAppList);
    this.activeAppsLength = this.colActiveApps.length;
    // console.log(this.intAppArrayLength);
  }

}



