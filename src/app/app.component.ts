import { Component } from '@angular/core';
import { Platform, NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabControllerPage } from '../pages/tab-controller/tab-controller';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  splash = true; // Set true for the splash screen, if you want to turn it off set false
  rootPage: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private af: AngularFirestore) {

    af.app.auth().onAuthStateChanged(() => {
      if (af.app.auth().currentUser != null && af.app.auth().currentUser.emailVerified == true) {
        this.rootPage = TabControllerPage; // Redirect to TabControllerPage if user != null and email is verified
      }
      else if ((af.app.auth().currentUser == null) || (af.app.auth().currentUser.emailVerified == false)) {
        this.rootPage = LoginPage; // If user's UID == null or user email not verified then redirect to LoginPage
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(() => {
        this.splash = false;
      }, 3400); // SplashScreen over after 3400ms

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
