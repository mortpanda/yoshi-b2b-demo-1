/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Adding the app for this application means, adding the user to the group that is used to assign the app to the user
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { Injectable } from '@angular/core';
import { OktaApiEndpoints } from './okta-api-endpoints';
import { OktaConfigService } from './okta-config.service';

@Injectable({
  providedIn: 'root'
})
export class OktaAddAppsService {

  arrActiveAppGroups;

  constructor(
    public OktaConfigService: OktaConfigService,
    public OktaApiEndpoints: OktaApiEndpoints,
  ) { }

  async GetAppGroups(appGroupURI, accesstoken) {
    const url = appGroupURI;
    //console.log(strurl)
    const thisFetch = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accesstoken,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Sec-Fetch-Site': 'same-origin',
        // 'Accwess-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
    })
      .then(response => response.json())
    this.arrActiveAppGroups = await thisFetch;
      //  console.log(this.arrActiveAppGroups)
    // window.location.replace(this.OktaConfigService.strRedirectURL);
  }

  // async GetAppGroups(appGroupURI, accesstoken) {
  //   const url = appGroupURI;
  //   //console.log(strurl)
  //   const thisFetch = await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + accesstoken,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       // 'Sec-Fetch-Site': 'same-origin',
  //       // 'Accwess-Control-Allow-Origin': '*',
  //       // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //     },
  //   })
  //     .then(response => response.json())
  //   this.arrAppGroups = await thisFetch;
  //   // console.log(this.arrAppGroups)
  //   // window.location.replace(this.OktaConfigService.strRedirectURL);
  // }

  async AddToGroup(groupid, userid, accessToken) {
    const url = await this.OktaConfigService.strBaseURI + this.OktaApiEndpoints.strAmendApp + groupid + "/users/" + userid
    console.log(url)
    const thisFetch = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Sec-Fetch-Site': 'same-origin',
        // 'Accwess-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
    })
      // .then(response => response.json())
    // this.arrAppGroups = await thisFetch;
    // console.log(this.arrAppGroups)
    // window.location.replace(this.OktaConfigService.strRedirectURL);
  }
}