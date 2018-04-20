import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  splash = true; // Set true for the splash screen, if you want to turn it off, set false
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(() => {
        this.splash = false; // If set to true, splasscreen wil go on loop and never stop
      }, 3400);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

