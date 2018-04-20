import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuyBookPage } from '../buy-book/buy-book';
import { SellBookPage } from '../sell-book/sell-book';
import { MessagesPage } from '../messages/messages';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the TabControllerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-controller',
  templateUrl: 'tab-controller.html',
})
export class TabControllerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public tab1Root = BuyBookPage;
  public tab2Root = SellBookPage;
  public tab3Root = MessagesPage;
  public tab4Root = ProfilePage;

}
