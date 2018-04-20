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

  email: string;
  resetForm: FormGroup;

  constructor(private af: AngularFirestore,
    private toast: ToastController,
    private navCtrl: NavController) {
  }

  // Init FormGroup
  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  // reset the password
  resetPassword(email: string) {

    let myCustom = new AlertMessages(this.toast);

    let auth = this.af.app.auth();
    return auth.sendPasswordResetEmail(email).then(() =>
    myCustom.presentCustomToast('Email sendt for tilbakestilling av passord'))
    this.navCtrl.push(LoginPage)
      .catch((error) => {
        console.log(error);
      });
  }

}
