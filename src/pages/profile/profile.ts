import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginPage } from '../login/login';
import { User } from '../../models/User';

/**
 * This class contains user's profile
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {} as User; // create an object of user
  userObject: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFirestore) {

      this.userObject = this.af.app.auth().currentUser;
      this.user.nickname = this.userObject.displayName;
      this.user.email = this.userObject.email;
  }

  // logout from app
  logOut() {
    this.af.app.auth().signOut();
    this.navigateToPage(LoginPage);
  }

  // navigate to page depend on which page
  navigateToPage(page: any) {
    this.navCtrl.push(page);
  }



}
