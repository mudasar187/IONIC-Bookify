import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  currentChat: Chat;
  messages: Message[];
  messageToBeSendt: string = "";

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams, private af: AngularFirestore, private chatProvider: ChatProvider) {
      this.currentChat = navParams.get('chat');

      this.getMessages((messages) => {
        this.messages = messages;
      })

  }

  getMessages(done: (messages: Message[]) => void) {
       //Flytt denne metoden
       this.af.collection('allMessages').doc(this.currentChat.chatId).collection('chat').snapshotChanges()
       .subscribe((actions) => {
         var messages: Message[] = [];
         actions.forEach((action) => {
           messages.push(action.payload.doc.data() as Message);
         });
         messages.sort((m1, m2): number => {
           if (m1.chatTime < m2.chatTime) return -1;
           if (m1.chatTime > m2.chatTime) return 1;
           return 0;
         });
         done(messages)
       });
  }

  giveChatPersonsName(chatMessage: Message) {
    if(chatMessage.from === this.af.app.auth().currentUser.uid) {
      return "Sender";
    } else {
      return "Mottaker";
    }
  }

  sendMessage() {
    this.chatProvider.sendChatMessage(this.af.app.auth().currentUser.uid, this.messageToBeSendt, this.currentChat.chatId, new Date().getTime());
    this.messageToBeSendt = "";
  }


}
