import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertMessages } from '../../alertMessages/AlertMessages';
import { LoginPage } from '../login/login';

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
  myCustomMessage: AlertMessages; // create a object of type AlertMessages

  constructor(private af: AngularFirestore,
    private toast: ToastController,
    private navCtrl: NavController) {
    this.myCustomMessage = new AlertMessages(this.toast); // send ToastController to constructor in AlertMessage
  }

  // Init FormGroup
  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  // reset the password
  resetPassword(email: string) {

    return this.af.app.auth().sendPasswordResetEmail(email).then(() =>
      this.myCustomMessage.presentCustomToast('Email sendt for tilbakestilling av passord')).then(() => {
        this.navigateToPage(LoginPage); // Redirect to LoginPage when reset email
      }).catch((error) => {
        this.myCustomMessage.presentCustomToast('Emailen er ikke registrert');
      });
  }

  // navigate to Page depend on which page
  navigateToPage(page: any) {
    this.navCtrl.push(page);
  }

}
