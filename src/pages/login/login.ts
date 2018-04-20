import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  user = {} as User; // create an object of user
  loginForm: FormGroup;

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
      if (!checkUser.emailVerified) {
        this.toast.create({
          message: 'Please verify your account',
          duration: 2000
        }).present();
      } else {
        this.navCtrl.push('HomePage');
      }
    }, error => {
      console.log(error);
      switch (error.code) {
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
}
