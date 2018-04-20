import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

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
    let auth = this.af.app.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => this.toast.create({
        message: 'Reset email sent',
        duration: 2000
      }).present())
      .catch((error) => {
        this.toast.create({
          message: 'Reset email sent to your registered email',
          duration: 2000
        }).present();
      })
  }

}
