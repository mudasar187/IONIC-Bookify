import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BookProvider } from '../../providers/book/book';
import { AngularFirestore } from 'angularfire2/firestore';


/**
 * This class contains all the books published by sellers
 */

@IonicPage()
@Component({
  selector: 'page-buy-book',
  templateUrl: 'buy-book.html',
})
export class BuyBookPage {

  userObject: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private af: AngularFirestore,
    private bookProvider: BookProvider) {
      this.userObject = this.af.app.auth().currentUser;
  }
}
