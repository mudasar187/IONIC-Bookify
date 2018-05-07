import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../models/Book';
import { BookProvider } from '../../providers/book/book';
import { ToastMessages } from '../../popUpMessages/toastMessages/ToastMessages';

@IonicPage()
@Component({
  selector: 'page-my-book-ads',
  templateUrl: 'my-book-ads.html',
})
export class MyBookAdsPage {

  myBookAds: string; // Variable for segment
  myActiveSales: Observable<Book[]>;
  myInactiveSales: Observable<Book[]>;

  private toastMessage: ToastMessages;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private af: AngularFirestore,
    private bookProvider: BookProvider,
    private toast: ToastController) {
      this.toastMessage = new ToastMessages(toast);
    this.getMyActiveSales();
    this.getMyInactiveSales();
  }

  private getMyActiveSales() {
    this.myActiveSales = this.bookProvider.getAllBooksOwnedByUserAndNotSold(this.af.app.auth().currentUser.uid);
  }

  private getMyInactiveSales() {
    this.myInactiveSales = this.bookProvider.getAllBooksOwnedByUserAndAreSold(this.af.app.auth().currentUser.uid);
  }

  markBookAsSold(book: Book) {
    this.toastMessage.presentCustomToast(book.bookTitle + ' sold!')
    this.bookProvider.markBookAsSold(book);
  }

  deleteBookFromMyAds(book: Book) {
    this.toastMessage.presentCustomToast(book.bookTitle + ' deleted!')
    this.bookProvider.deleteBook(book);
  }

}
