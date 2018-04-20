import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { TabControllerPage } from '../tab-controller/tab-controller';

/**
 * This is the main LoginPage
 * A user can login with existing email and password
 * A user can registrate a new account
 * A user can reset password if password is forgotton
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  user = {} as User; // create an object of user
  loginForm: FormGroup; // create a form to validate inputs

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
    this.af.app.auth().signInWithEmailAndPassword(user.email, user.password).then(response => {
      let checkUser = this.af.app.auth().currentUser;
      if (!checkUser.emailVerified) { // if not verified, send a toast message to remind user to verify email
        this.toast.create({
          message: 'Please verify your account',
          duration: 2000
        }).present();
      } else {
        this.navCtrl.push(TabControllerPage); // If user have verified account, go to TabControllerPage
      }
    }, error => {
      console.log(error);
      switch (error.code) { // If user dont exists or password is incorrect
        case 'auth/user-not-found':
          this.toast.create({
            message: 'Wrong username/password',
            duration: 2000
          }).present();
          break;
        case 'auth/wrong-password':
          this.toast.create({
            message: 'Wrong username/password',
            duration: 2000
          }).present();
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