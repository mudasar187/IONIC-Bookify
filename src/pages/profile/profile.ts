import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginPage } from '../login/login';

/**
 * This class contains user's profile
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFirestore) {
  }

  // Logout from app
  logOut() {
    this.af.app.auth().signOut();
    this.navCtrl.push(LoginPage);
  }

}
