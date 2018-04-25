import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginPage } from '../login/login';
import { ToastMessages } from '../../popUpMessages/toastMessages/ToastMessages';

/**
 * This class contains methods so a user can reset password
 */
@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage implements OnInit {

  email: string; // to validate email
  resetForm: FormGroup; // create a object of FormGroup to validate email
  myCustomToast: ToastMessages; // create a object of type ToastMessages

  constructor(private af: AngularFirestore,
    private toast: ToastController,
    private navCtrl: NavController) {
    this.myCustomToast = new ToastMessages(this.toast); // send ToastController to constructor in ToastMessages
  }

  // Init FormGroup
  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  // reset the password by sending an reset email to user's email account
  resetPassword(email: string) {
    return this.af.app.auth().sendPasswordResetEmail(email).then(() =>
      this.myCustomToast.presentCustomToast('Email sendt for tilbakestilling av passord')).then(() => {
        this.navigateToPage(LoginPage); // Redirect to LoginPage when reset email
      }).catch((error) => {
        this.myCustomToast.presentCustomToast('Emailen er ikke registrert');
      });
  }

  // navigate to Page depend on which page
  navigateToPage(page: any) {
    this.navCtrl.push(page);
  }

}
