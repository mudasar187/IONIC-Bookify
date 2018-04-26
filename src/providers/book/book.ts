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
  addBookToCollection(userUid, nickname, bookImage, bookTitle, bookPrice, location, bookConditions) {
    this.bookListCollection.add({
      userId: userUid,
      nickname: nickname,
      bookImage: bookImage,
      bookTitle: bookTitle,
      price: bookPrice,
      location: location,
      sold: false,
      conditions: bookConditions
    } as Book);
  }
}
