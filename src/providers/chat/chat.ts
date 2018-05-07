import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../../models/Chat';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  private chat = {} as Chat;
  private chatCollection: AngularFirestoreCollection<Chat>; // collection keep the referance to our user

  constructor(public http: HttpClient,
    private af: AngularFirestore) {
  }

  // get all books owned by specific user by query that are not sold at still out for sale
  getAllChats(uid: string) {
    this.chatCollection = this.af.collection<Chat>('chat', (ref) => {
      return ref.where('userId', '==', ''+uid+'')
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
