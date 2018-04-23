import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { AlertMessages } from '../../alertMessages/AlertMessages';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/**
 * This class contains all operations against the user collection on Firestore
 */
@Injectable()
export class UserCollectionProvider {

  userListCollection: AngularFirestoreCollection<User>; // Collection keep the referance to user
  user = {} as User;

  constructor(public af: AngularFirestore) {
    this.userListCollection = af.collection<User>('users'); // Reference to user collection
  }

  // Add a user to the collection
  addUserToCollection(uid, nickname, email, created) {
    this.userListCollection.doc('' + uid + '').set({ uid: uid, nickname: nickname, email: email, created: created } as User);
  }

  // Get user data

}
