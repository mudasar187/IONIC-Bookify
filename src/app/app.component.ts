import { Component } from '@angular/core';
import { Platform, ToastController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabControllerPage } from '../pages/tab-controller/tab-controller';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import { AlertMessages } from '../alertMessages/AlertMessages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  splash = true; // Set true for the splash screen, if you want to turn it off set false
  userCollection: AngularFirestoreCollection<User>; // Reference to collection on Firestore. Present structure as User model
  rootPage: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private af: AngularFirestore,
    public toastCtrl: ToastController) {

    // Create a object of AlertMessages, sending ToastController to the AlertMessages constructor
    let myCustomToast = new AlertMessages(this.toastCtrl);

    // Create a reference to 'users' collection in Firestore
    this.userCollection = af.collection<User>('users');

    let authObserve = af.app.auth().onAuthStateChanged((user) => {
      if (af.app.auth().currentUser != null && af.app.auth().currentUser.emailVerified == true) { // Checks if user's UID != null and user is email verified, then redirect to TabControllerPage

        // Get the user from user collection to create a welcome message based on who is logging on to the app
        this.userCollection.doc(af.app.auth().currentUser.uid).ref.get().then((doc) => {
          if (doc.exists) {
            myCustomToast.presentCustomToast('Velkommen ' + `${doc.data().nickname}`); // Give a welcome toast message
          }
        }).catch(function (error) {
          console.log("Error getting user document: ", error);
        });

        this.rootPage = TabControllerPage;
      } else if ((user == null) || (user.emailVerified == false)) {
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

