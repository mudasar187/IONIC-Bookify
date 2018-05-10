import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BookProvider } from '../../providers/book/book';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../models/Book';
import { DetailPage } from '../detail/detail';

/**
 * Feed class
 * Where all the books for sale contains
 */

@IonicPage()
@Component({
  selector: 'page-buy-book',
  templateUrl: 'buy-book.html',
})
export class BuyBookPage {

  books: Observable<Book[]>

  constructor(
    private navCtrl: NavController,
    private bookProvider: BookProvider,
    private platform: Platform) {
    this.books = this.bookProvider.getAllBooksOutForSale(); // initalize the list with all books
  }

  
  // redirect to detail page for the book user click on, send the book object to detail page to show details about the specific book
  goToDetailPage(book: Book) {
    this.navCtrl.push('DetailPage', { 'book': book });
  }

}
