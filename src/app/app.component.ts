import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabControllerPage } from '../pages/tab-controller/tab-controller';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  splash = true; // Set true for the splash screen, if you want to turn it off set false
  rootPage: any;
  collection: AngularFirestoreCollection<User>;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              af: AngularFirestore,
              toast: ToastController) {

    const authObserve = af.app.auth().onAuthStateChanged((user) => {
      if (af.app.auth().currentUser != null && af.app.auth().currentUser.emailVerified == true) { // Checks if user's UID != null and user is email verified, then redirect to HomePage

      // get the user from user collection to create a welcome message based on who is logging on to the app
      this.collection = af.collection<User>('users');
      this.collection.doc(af.app.auth().currentUser.uid).ref.get().then(function(doc) {
        if (doc.exists) {
            toast.create({
              message: `Welcome ${doc.data().nickname}`,
              duration: 2000
            }).present();
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });

        this.rootPage = TabControllerPage;
      } else if ((user == null) || (user.emailVerified == false)) { // Otherwise redirect to welcomepage
        this.rootPage = LoginPage; // If user's UID == null or user email not verified then redirect to WelcomePage
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(() => {
        this.splash = false;
      }, 3400);

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

