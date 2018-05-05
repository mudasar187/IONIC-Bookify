import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BookProvider } from '../../providers/book/book';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../models/Book';


/**
 * This class contains all the books published by sellers
 */

@IonicPage()
@Component({
  selector: 'page-buy-book',
  templateUrl: 'buy-book.html',
})
export class BuyBookPage {

  userObject: any;
  books: Observable<Book[]>

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private af: AngularFirestore,
    private bookProvider: BookProvider) {
      this.userObject = this.af.app.auth().currentUser;
      this.books = this.bookProvider.getAllBooksOutForSale();
  }

}
