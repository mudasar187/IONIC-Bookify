import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../models/Book';
import { BookProvider } from '../../providers/book/book';

/**
 * This class contains overview for a user's specific history
 * Overview for books on sales (active)
 * Overview for book which was on sale (inactive) after sold
 * Overview for books who is buyed from the specific user
 */

@IonicPage()
@Component({
  selector: 'page-my-sales-and-buys',
  templateUrl: 'my-sales-and-buys.html',
})
export class MySalesAndBuysPage {

  myBuysAndSales: string; // Variable for segment
  mySales: Observable<Book[]>;
  myBuys: Observable<Book[]>;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private af: AngularFirestore,
    private bookProvider: BookProvider) {
    this.getMySales();
    this.getMyBuys();
  }

  private getMySales() {
    this.mySales = this.bookProvider.getAllBooksOwnedByUserAndAreSold(this.af.app.auth().currentUser.uid);
  }

  private getMyBuys() {
    this.myBuys = this.bookProvider.getAllBooksOwnedByUserAndNotSold(this.af.app.auth().currentUser.uid);
  }

}
