import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * This class contains where a seller can add a book to a sale
 */

@IonicPage()
@Component({
  selector: 'page-sell-book',
  templateUrl: 'sell-book.html',
})
export class SellBookPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellBookPage');
  }

}
