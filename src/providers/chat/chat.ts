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

}
