import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { ToastMessages } from '../../popUpMessages/toastMessages/ToastMessages';

/**
 * Register user class
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  user = {} as User; // create an object of user
  userForm: FormGroup; // create a form to validate

  private myCustomToast: ToastMessages; // create an object of ToastMessages

  constructor(
    private navCtrl: NavController,
    private af: AngularFirestore,
    private toast: ToastController,
    private navParams: NavParams) {
    this.myCustomToast = new ToastMessages(this.toast); // send ToastController to constructor in ToastMessages
  }

  // Init the FormGroup
  ngOnInit() {
    this.userForm = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      re_password: new FormControl('', [Validators.required, this.equalto('password')])
    });

  }

  // Make a new account for new registered user
  // When registered send a verification mail and also update the nickname in displayName in firestore
  registerUser(user: User) {

    this.af.app.auth().createUserWithEmailAndPassword(user.email, user.password).then(() => {
      let userObject = this.af.app.auth().currentUser; // to get user information like uid, email

      userObject.sendEmailVerification(); // Send email verification to user

      // update the profile with nickname, no photo, user own option if he/she want to upload picture in ProfilePage
      this.af.app.auth().currentUser.updateProfile({ displayName: user.nickname, photoURL: undefined }).then(() => {
          this.af.collection(userObject.uid).doc('profile').set({nickname: user.nickname, email: user.email}).then(() => {
            this.navigateToPage(LoginPage); // navigate back to LoginPage
          }).catch((error) => {});
      }).catch((err) => {}); // TypeScript standard , undefined , not null

    }).catch((error) => { // If error
      if (error.code == 'auth/email-already-in-use') {
        this.myCustomToast.presentCustomToast('Emailen er i bruk'); // Email already in use
      } else {
        this.myCustomToast.presentCustomToast('Konto ikke opprettet, prøv igjen'); // Something went wrong, try again
      }
    });
  }

  // Check if the password and re-type password is the same, to ensure that user have entred the password he/she choosed
  private equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      let isValid = control.root.value[field_name] == control.value

      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return undefined; // TypeScript standard, return undefined and not null
    };
  }

  // navigate to Page depend on which page
  navigateToPage(page: any) {
    this.navCtrl.push(page);
  }

}
