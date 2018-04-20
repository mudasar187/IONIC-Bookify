import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { Observable } from 'rxjs/Observable';
import { UserCollectionProvider } from '../../providers/user-collection/user-collection';

/**
 * THis class contains the functionality to create a new user and add user to own collection
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  user = {} as User;
  userForm: FormGroup;

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

  // make a new account for new registered user and also create a user in user collection
  registerUser(user: User) {
    this.af.app.auth().createUserWithEmailAndPassword(user.email, user.password).then(response => {
      let userObject = this.af.app.auth().currentUser;
      this.userCollectionProvider.addUserToCollection(userObject.uid, user.nickname, userObject.email, new Date().toISOString());
      userObject.sendEmailVerification();
      this.navCtrl.push('WelcomePage');
    }, err => {
      if (err.code == 'auth/email-already-in-use') {
        this.toast.create({
          message: 'Email already in use',
          duration: 2000
        }).present();
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
