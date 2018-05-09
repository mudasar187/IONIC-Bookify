import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Chat } from '../../models/Chat';
import { ChatProvider } from '../../providers/chat/chat';

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

  myChats: Observable<Chat[]>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams, private chatProvider: ChatProvider) {
      this.myChats = this.chatProvider.getMyChat();
  }

  goToChat(chat: Chat) {
    console.log("Chat: " + JSON.stringify(chat));
      this.navCtrl.push('ChatPage', {chat: chat});
  }

}
