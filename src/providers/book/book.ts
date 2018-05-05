import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../models/Book';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/*
  Book provider class
  Contains all operations against book collection
*/
@Injectable()
export class BookProvider {

  private book = {} as Book;
  private bookListCollection: AngularFirestoreCollection<Book>; // collection keep the referance to our user


  constructor(private http: HttpClient,
    private af: AngularFirestore) {
      this.bookListCollection = this.af.collection<Book>('books', (ref) => {
        return ref.where('bookSold', '==', false);
      });
  }

  // add a user to the collection
  addBookToCollection(userUid, userNickName, userImage, bookImage, bookIsbn, bookTitle, bookDescription, bookPrice, bookConditions, sold, location, lat, lng, buyer, created) {
    this.bookListCollection.add({
      userId: userUid,
      userNickName: userNickName,
      userImage: userImage,
      bookImage: bookImage,
      bookIsbn: bookIsbn,
      bookTitle: bookTitle,
      bookDescription: bookDescription,
      bookPrice: bookPrice,
      bookConditions: bookConditions,
      bookSold: sold,
      location: location,
      lat: lat,
      lng: lng,
      buyer: buyer,
      created: created
    } as Book);
  }

  getAllBooksOutForSale() {
    return this.bookListCollection.snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Book;
          let id = action.payload.doc.id;
          return {
            id,
            ...data
          };
        })
      });
  }
}
