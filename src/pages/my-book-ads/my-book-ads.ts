import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../models/Book';
import { BookProvider } from '../../providers/book/book';
import { ToastMessages } from '../../popUpMessages/toastMessages/ToastMessages';

/**
 * My Ads class
 * Contains all the active adds and inactive ads when book is sold
 */
@IonicPage()
@Component({
  selector: 'page-my-book-ads',
  templateUrl: 'my-book-ads.html',
})
export class MyBookAdsPage {

  myBookAds: string; // Variable for segment, showing the active and inactive adds
  myActiveSales: Observable<Book[]>; // active books observable
  myInactiveSales: Observable<Book[]>; // inactive observable

  private toastMessage: ToastMessages; // creating an object of type ToastMessages

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private af: AngularFirestore,
    private bookProvider: BookProvider,
    private toast: ToastController) {
    this.toastMessage = new ToastMessages(toast); // create new instance of ToastMessages
    this.getMyActiveSales(); // get all active books
    this.getMyInactiveSales(); // get all inactive books
  }

  // to mark a book as sold, provided by BookProvider
  markBookAsSold(book: Book) {
    this.toastMessage.presentCustomToast(book.bookTitle + ' solgt!');
    this.bookProvider.markBookAsSold(book);
  }

  // delete a book is user want so, provided by BooKprovider
  deleteBookFromMyAds(book: Book) {
    this.toastMessage.presentCustomToast(book.bookTitle + ' slettet!');
    this.bookProvider.deleteBook(book);
  }

  // firestore query to get all active books, provided by BookProvider
  private getMyActiveSales() {
    this.myActiveSales = this.bookProvider.getAllBooksOwnedByUserAndNotSold(this.af.app.auth().currentUser.uid);
  }

  // firestore query to get all inactive books, provided by BookProvider
  private getMyInactiveSales() {
    this.myInactiveSales = this.bookProvider.getAllBooksOwnedByUserAndAreSold(this.af.app.auth().currentUser.uid);
  }

}
