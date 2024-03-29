import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../models/Book';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/*
* BookCollection provider class
*/
@Injectable()
export class BookProvider {

  private book = {} as Book;
  private bookListCollection: AngularFirestoreCollection<Book>;

  constructor(
    private http: HttpClient,
    private af: AngularFirestore) {
  }


  // add a user to the collection
  addBookToCollection(userUid, userNickName, bookAuthor, bookImage, bookIsbn, bookTitle, bookDescription, bookPrice, bookConditions, sold, location, lat, lng, created) {
    this.bookListCollection.add({
      userId: userUid,
      userNickName: userNickName,
      bookAuthor: bookAuthor,
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
      created: created
    } as Book);
  }


  // get all books out for sale using query to get all book which is 'bookSold' == false and 'active' == true
  getAllBooksOutForSale() {
    this.bookListCollection = this.af.collection<Book>('books', (ref) => {
      return ref.where('bookSold', '==', false);
    });
    return this.bookListCollection.snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Book;
          let id = action.payload.doc.id;
          // dismiss
          return {
            id,
            ...data
          };
        })
      });
  }


  // get all books owned by specific user by query that are not sold at still out for sale
  getAllBooksOwnedByUserAndNotSold(uid: string) {
    this.bookListCollection = this.af.collection<Book>('books', (ref) => {
      return ref.where('userId', '==', '' + uid + '').where('bookSold', '==', false)
    });
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


  // get all books owned by by specific user that are owned by specific user and is sold and now inactive
  getAllBooksOwnedByUserAndAreSold(uid: string) {
    this.bookListCollection = this.af.collection<Book>('books', (ref) => {
      return ref.where('userId', '==', '' + uid + '').where('bookSold', '==', true)
    });
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


  // update the field bookSold = true
  markBookAsSold(book: Book) {
    this.bookListCollection.doc(book.id).update({
      bookSold: true
    });
  }


  // delete the book from collection
  deleteBook(book: Book) {
    this.bookListCollection.doc(book.id).delete();
  }

}
