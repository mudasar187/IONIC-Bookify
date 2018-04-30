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
  private books: Observable<Book[]>


  constructor(private http: HttpClient,
    private af: AngularFirestore) {
    this.bookListCollection = af.collection<Book>('books');
  }

  // add a user to the collection
  addBookToCollection(userUid, nickName, bookImage, bookIsbn, saleHeading, bookDescription, bookPrice, bookConditions, sold, location, lat, lng) {
    this.bookListCollection.add({
      userId: userUid,
      nickName: nickName,
      image: bookImage,
      isbn: bookIsbn,
      heading: saleHeading,
      description: bookDescription,
      price: bookPrice,
      conditions: bookConditions,
      sold: sold,
      location: location,
      lat: lat,
      lng: lng
    } as Book);
  }

  getAllBooksOutForSale() {
    this.books = this.bookListCollection.snapshotChanges()
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
