import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/User';

@Injectable()
export class UserCollectionProvider {

  public userListCollection: AngularFirestoreCollection<User>; // collection keep the referance to our user
  user = {} as User;

  constructor(public af: AngularFirestore) {
    this.userListCollection = af.collection<User>('users');
  }

  // add a user to the collection
  addUserToCollection(uid, nickname, email, created) {
    this.userListCollection.doc(''+uid+'').set({uid: uid, nickname: nickname, email: email, created: created } as User);
  }

}
