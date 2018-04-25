import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { TabControllerPage } from '../tab-controller/tab-controller';
import { ToastMessages } from '../../popUpMessages/toastMessages/ToastMessages';

/**
 * This class is the LoginPage
 * A user can login with right credentials
 * Can also navigate to ResetPasswordPage and RegisterPage
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  user = {} as User; // create an object of user
  loginForm: FormGroup; // create a form to validate
  myCustomToast: ToastMessages; // create a object type of ToastMessages

  constructor(public navCtrl: NavController,
    private af: AngularFirestore,
    private toast: ToastController) {
      this.myCustomToast = new ToastMessages(this.toast); // send ToastController to ToastMessages constructor
  }

  // init FormGroup
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // login user, also handle if user type right or wrong username/password
  loginUser(user: User) {

    this.af.app.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {

      if (!this.af.app.auth().currentUser.emailVerified) { // if not verified, send a toast message to remind user to verify email
        this.myCustomToast.presentCustomToast('Verifiser emailen før du logger inn');
      } else {
        this.navigateToPage(TabControllerPage); // If user have verified account, go to TabControllerPage
      }
    }).catch((error) => {
      switch (error.code) { // If user dont exists or password is incorrect
        case 'auth/user-not-found':
          this.myCustomToast.presentCustomToast('Feil brukernavn/passord');
          break;
        case 'auth/wrong-password':
          this.myCustomToast.presentCustomToast('Feil brukernavn/passord');
          break;
      }
    });
  }

  // navigate to page depend on which page
  navigateToPage(page: any) {
    this.navCtrl.push(page);
  }
}
