import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from 'app/landing/landing.component';
import {MainPageComponent} from 'app/main-page/main-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'main', component: MainPageComponent },
  
  // { path: 'profilev2', component: Profilev2Component },
  // { path: 'store', component: SwagstoreComponent },
  // { path: 'checkout', component: CheckoutComponent },
  // { path: 'save', component: SaveModalComponent },
  //{ path: 'signup',           component: SignupComponent },
  //{ path: 'landing',          component: LandingComponent },
  // { path: 'nucleoicons',      component: NucleoiconsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
