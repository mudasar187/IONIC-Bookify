import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Chat } from '../../models/Chat';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../models/Message';
import { AngularFirestore } from 'angularfire2/firestore';
import { ChatProvider } from '../../providers/chat/chat';

/**
 * Chat class
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content; // to use scroll function

  currentChat: Chat; // create object of Chat
  messageToBeSendt: string = ""; // message to be sent
  disableBtn = true; // to disable 'send' button
  messages: Observable<Chat[]>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private af: AngularFirestore,
    private chatProvider: ChatProvider) {
    this.currentChat = navParams.get('chat'); // get chat id from Message tab controller
    this.messages = this.chatProvider.getMessages(this.currentChat.chatId);
  }


  // this method is to understand who is sender and receiver
  giveChatPersonsName(chatMessage: Message) {
    if (chatMessage.from == this.af.app.auth().currentUser.uid) {
      return "Jeg";
    } else {
      return "Andre personen";
    }
  }


  // send message from currentUser with the text and add to current chatId collection
  sendMessage() {
    this.scrollToBottom();
    this.chatProvider.sendChatMessage(this.af.app.auth().currentUser.uid, this.messageToBeSendt, this.currentChat.chatId, new Date())
    this.messageToBeSendt = ""; // empty send message input field
  }


  // check if input text is empty, if empty , disable send button
  checkIfTextIsEmptyOrNot() {
    this.disableBtn = this.messageToBeSendt === "";
  }

  
  // scroll to bottom each time send button is pressed
  private scrollToBottom() {
    this.content.scrollToBottom();
  }

}
