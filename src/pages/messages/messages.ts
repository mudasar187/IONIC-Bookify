import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * This class contains all the chats with other users
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

}
