import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../models/Book';
import { BookProvider } from '../../providers/book/book';

@IonicPage()
@Component({
  selector: 'page-my-book-ads',
  templateUrl: 'my-book-ads.html',
})
export class MyBookAdsPage {

  myBookAds: string; // Variable for segment
  myActiveSales: Observable<Book[]>;
  myInactiveSales: Observable<Book[]>;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private af: AngularFirestore,
    private bookProvider: BookProvider) {
    this.getMyActiveSales();
    this.getMyInactiveSales();
  }

  private getMyActiveSales() {
    this.myActiveSales = this.bookProvider.getAllBooksOwnedByUserAndNotSoldAndStillActive(this.af.app.auth().currentUser.uid);
  }

  private getMyInactiveSales() {
    this.myInactiveSales = this.bookProvider.getAllBooksOwnedByUserAndAreSoldAndIsInactive(this.af.app.auth().currentUser.uid);
  }

}
