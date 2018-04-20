import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { Observable } from 'rxjs/Observable';
import { UserCollectionProvider } from '../../providers/user-collection/user-collection';
import { AlertMessages } from '../../alertMessages/AlertMessages';
import { LoginPage } from '../login/login';

/**
 * THis class contains the functionality to create a new user and add user to own collection
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  user = {} as User; // Create an object of user
  userForm: FormGroup; // create a form to validate inputs

  constructor(public navCtrl: NavController,
    private af: AngularFirestore,
    private toast: ToastController,
    private navParams: NavParams,
    private userCollectionProvider: UserCollectionProvider) {

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

    let myCustomToast = new AlertMessages(this.toast);

    this.af.app.auth().createUserWithEmailAndPassword(user.email, user.password).then(response => {

      let userObject = this.af.app.auth().currentUser;

      this.userCollectionProvider.addUserToCollection(userObject.uid, user.nickname, userObject.email, new Date().toISOString());

      // Send email verification after user is added to collection
      userObject.sendEmailVerification();

      // Go back to LoginPage when created a account
      this.navCtrl.push(LoginPage);
    }, err => {
      if (err.code == 'auth/email-already-in-use') {
        myCustomToast.presentCustomToast('Emailen er allerede i bruk');
      }
    });
  }

  // Check if the password and re-type password is the same, to ensure that user have entred the password he/she choosed
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      let input = control.value;
      let isValid = control.root.value[field_name] == input

      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }

}
