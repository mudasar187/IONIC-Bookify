import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../models/Book';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

/*
  Book provider class
  Contains all operations against book collection
*/
@Injectable()
export class BookProvider {

  public bookListCollection: AngularFirestoreCollection<Book>; // collection keep the referance to our user
  book = {} as Book;

  constructor(private http: HttpClient,
    private af: AngularFirestore) {
    this.bookListCollection = af.collection<Book>('books');
  }

  // add a user to the collection
  addBookToCollection(userUid, nickName, bookImage, bookIsbn, saleHeading, bookDescription, bookPrice, bookConditions, location, lat, lng) {
    this.bookListCollection.add({
      userId: userUid,
      nickName: nickName,
      image: bookImage,
      isbn: bookIsbn,
      heading: saleHeading,
      description: bookDescription,
      price: bookPrice,
      conditions: bookConditions,
      location: location,
      lat: lat,
      lng: lng
    } as Book);
  }
}
