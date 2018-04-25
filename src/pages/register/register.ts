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
 * THis class contains the functionality to create a new user and add user to own collection
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  user = {} as User; // create an object of user so i can validate whats come in input fields
  userForm: FormGroup; // create a form to validate
  myCustomToast: ToastMessages; // create an object of ToastMessages

  constructor(public navCtrl: NavController,
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

  // Make a new account for new registered user and also create a user in user collection
  registerUser(user: User) {

    this.af.app.auth().createUserWithEmailAndPassword(user.email, user.password).then(() => {

      let userObject = this.af.app.auth().currentUser; // to get user information like uid, email
      // Send email verification to user
      userObject.sendEmailVerification();

      this.af.app.auth().currentUser.updateProfile({displayName: user.nickname, photoURL: null});

      this.navigateToPage(LoginPage);

    }).catch((error) => { // If error
      if (error.code == 'auth/email-already-in-use') {
        this.myCustomToast.presentCustomToast('Emailen er i bruk');
      } else {
        this.myCustomToast.presentCustomToast('Konto ikke opprettet, prøv igjen');
      }
    });
  }

  // Check if the password and re-type password is the same, to ensure that user have entred the password he/she choosed
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      let isValid = control.root.value[field_name] == control.value

      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }

  // navigate to Page depend on which page
  navigateToPage(page: any) {
    this.navCtrl.push(page);
  }

}
