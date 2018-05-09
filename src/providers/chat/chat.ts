import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../../models/Chat';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

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

  //Denne metoden returnerer en liste over chatId-er og navnene til chattene.
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

  //Gir beskjed til seller om chatten, for at seller får tilgang.
  setChatInfoToSeller(sellerUid: string, chatId: string, chatName: string, setupDone: () => void) {
      this.af.collection(sellerUid).doc('messages').collection('myMessages').add({chatId: chatId, chatName: chatName}).then(() => {
          setupDone();
      });
  }

  //Du gir en beskjed til deg selv at du har tilgang til chatten fra riktig collection.
  setChatInfoToBuyer(chatId: string, chatName: string, setupDone: () => void) {
      this.af.collection(this.af.app.auth().currentUser.uid).doc('messages').collection('myMessages').add({chatId: chatId, chatName: chatName})
      .then(() => {
          setupDone();
      });
  }

  //Returnerer alle chat meldinger og hvem det er fra.
  getChatMessages(chatId: string) {
    return this.af.collection('allMessages').doc(chatId).collection('chat').valueChanges();
  }

  //Legger en chat medling med hvem er er fra til chat collection.
  sendChatMessage(fromUid: string, message: string, chatId: string, chatTime: number) {
    this.af.collection('allMessages').doc(chatId).collection('chat').add({from: fromUid, message: message, chatTime: chatTime});
  }


}
