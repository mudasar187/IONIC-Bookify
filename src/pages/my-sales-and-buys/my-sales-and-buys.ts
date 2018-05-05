import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../models/Book';
import { BookProvider } from '../../providers/book/book';

/**
 * Generated class for the MySalesAndBuysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-sales-and-buys',
  templateUrl: 'my-sales-and-buys.html',
})
export class MySalesAndBuysPage {

  myBuysAndSales: string;
  mySales: Observable<Book[]>;
  myBuys: Observable<Book[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFirestore,
    private bookProvider: BookProvider) {
      this.getMySales();
      this.getMyBuys();
  }

  getMySales() {
    this.myBuys = this.bookProvider.getAllBooksOwnedByUserAndNotSold(this.af.app.auth().currentUser.uid);
  }

  getMyBuys() {
      this.mySales = this.bookProvider.getAllBooksOwnedByUserAndAreSold(this.af.app.auth().currentUser.uid);
  }

}
