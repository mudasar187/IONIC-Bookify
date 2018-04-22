import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { TabControllerPage } from '../tab-controller/tab-controller';
import { AlertMessages } from '../../alertMessages/AlertMessages';

/**
 * This class is LoginPage
 * A user can login with existing email and password
 * A user can registrate a new account
 * A user can reset password if password is forgotton
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  user = {} as User; // create an object of user so i can validate whats come in input fields
  loginForm: FormGroup; // create a form to validate

  constructor(public navCtrl: NavController,
    private af: AngularFirestore,
    private toast: ToastController) {
  }

  // Init FormGroup
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // login user, also handle if user type right or wrong username/password
  loginUser(user: User) {

    // Create a object of AlertMessages, sending ToastController to the AlertMessages constructor
    let myCustomToast = new AlertMessages(this.toast);

    this.af.app.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {

      if (!this.af.app.auth().currentUser.emailVerified) { // if not verified, send a toast message to remind user to verify email
        myCustomToast.presentCustomToast('Verifiser emailen før du logger inn');
      } else {
        this.navCtrl.push(TabControllerPage); // If user have verified account, go to TabControllerPage
      }
    }).catch((error) => {
      switch (error.code) { // If user dont exists or password is incorrect
        case 'auth/user-not-found':
          myCustomToast.presentCustomToast('Feil brukernavn/passord');
          break;
        case 'auth/wrong-password':
          myCustomToast.presentCustomToast('Feil brukernavn/passord');
          break;
      }
    });
  }

  // Brings user to reset password page
  forgotPassword() {
    this.navCtrl.push('ResetPasswordPage');
  }

  // Brings user to register page to create a new account
  registerUser() {
    this.navCtrl.push('RegisterPage');
  }
}
