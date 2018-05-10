import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Chat } from '../../models/Chat';
import { ChatProvider } from '../../providers/chat/chat';

/**
 * Messages class
 * Contains all the conversation
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  myChats: Observable<Chat[]>; // create observable of myChats

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private chatProvider: ChatProvider) {
    this.myChats = this.chatProvider.getMyChat(); // get all ongoing chats
  }

  
  // go to existing chat
  goToChat(chat: Chat) {
    this.navCtrl.push('ChatPage', { chat: chat });
  }

}
