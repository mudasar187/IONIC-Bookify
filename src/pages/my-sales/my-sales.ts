import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { TabControllerPage } from '../tab-controller/tab-controller';

/**
 * Generated class for the MySalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-sales',
  templateUrl: 'my-sales.html',
})
export class MySalesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
