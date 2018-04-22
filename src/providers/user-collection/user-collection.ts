import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/User';

/**
 * This class contains all operations against the user collection on Firestore
 */
@Injectable()
export class UserCollectionProvider {

  userListCollection: AngularFirestoreCollection<User>; // collection keep the referance to our user

  constructor(public af: AngularFirestore) {
    this.userListCollection = af.collection<User>('users'); // make a reference to user collection
  }

  // Add a user to the collection
  addUserToCollection(uid, nickname, email, created) {
    this.userListCollection.doc(''+uid+'').set({uid: uid, nickname: nickname, email: email, created: created } as User);
  }

  

}
