import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * This class contains all the books published by sellers
 */

@IonicPage()
@Component({
  selector: 'page-buy-book',
  templateUrl: 'buy-book.html',
})
export class BuyBookPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }



}
