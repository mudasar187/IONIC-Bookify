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
  myCustomMessage: AlertMessages; // create a object type of AlertMessage

  constructor(public navCtrl: NavController,
    private af: AngularFirestore,
    private toast: ToastController) {
      this.myCustomMessage = new AlertMessages(this.toast); // send ToastController to AlertMessage constructor
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
        this.myCustomMessage.presentCustomToast('Verifiser emailen før du logger inn');
      } else {
        this.navigateToPage(TabControllerPage); // If user have verified account, go to TabControllerPage
      }
    }).catch((error) => {
      switch (error.code) { // If user dont exists or password is incorrect
        case 'auth/user-not-found':
          this.myCustomMessage.presentCustomToast('Feil brukernavn/passord');
          break;
        case 'auth/wrong-password':
          this.myCustomMessage.presentCustomToast('Feil brukernavn/passord');
          break;
      }
    });
  }

  // navigate to page depend on which page
  navigateToPage(page: any) {
    this.navCtrl.push(page);
  }
}
