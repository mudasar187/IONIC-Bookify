import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../../models/Chat';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Message } from '../../models/Message';

/*
* Chat collection class
*/
@Injectable()
export class ChatProvider {

  private chat = {} as Chat;
  private chatCollection: AngularFirestoreCollection<Chat>; // collection keep the referance to our user

  constructor(
    private http: HttpClient,
    private af: AngularFirestore) {
  }


  // return a list with all chatId's and name for all my chats
  getMyChat() {
    return this.af.collection<Chat>(this.af.app.auth().currentUser.uid).doc('messages').collection('myMessages').snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Chat;
          let id = action.payload.doc.id;
          // dismiss
          return {
            id,
            ...data
          };
        })
      });
  }


  // give information about the chat so seller can get access the chat in his own collection
  setChatInfoToSeller(sellerUid: string, chatId: string, chatName: string, setupDone: () => void) {
    this.af.collection(sellerUid).doc('messages').collection('myMessages').add({ chatId: chatId, chatName: chatName }).then(() => {
      setupDone();
    });
  }


  // give currentUser information that currentUser have access to chat from the right collection
  setChatInfoToBuyer(chatId: string, chatName: string, setupDone: () => void) {
    this.af.collection(this.af.app.auth().currentUser.uid).doc('messages').collection('myMessages').add({ chatId: chatId, chatName: chatName })
      .then(() => {
        setupDone();
      });
  }


  // adding chat message to chat collection
  sendChatMessage(fromUid: string, message: string, chatId: string, chatTime: any) {
    this.af.collection('allMessages').doc(chatId).collection('chat').add({ from: fromUid, message: message, chatTime: chatTime });
  }

  
  // get all chat messages between users
  // sorting them by date/time
  getMessages(chatId: string) {
    this.chatCollection = this.af.collection<Chat>('allMessages').doc(chatId).collection('chat', (ref) => {
      return ref.orderBy('chatTime', 'asc');
    });
    return this.chatCollection.snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Chat;
          let id = action.payload.doc.id;
          return {
            id,
            ...data
          };
        })
      });
  }

}
