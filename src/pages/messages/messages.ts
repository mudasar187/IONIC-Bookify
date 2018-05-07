import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Messages class
 * Contains all the conversation with sellers and buyers
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams) {
  }

}
