import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Book } from '../../models/Book';
import { PhotoOptions } from '../../cameraOptions/PhotoOptions';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Chat } from '../../models/Chat';
import { ChatProvider } from '../../providers/chat/chat';
import { LoaderMessages } from '../../popUpMessages/loaderMessages/LoaderMessages';
import { AngularFirestore } from 'angularfire2/firestore';

declare var google: any;

/**
 * Detail class
 * To show details about a specific book
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  @ViewChild('map') mapRef: ElementRef; // references to map

  book: Book; // create an object of type Book
  private loadingMessage: LoaderMessages;

  private map: any; // create a variable to hold the map
  private photoOptions: PhotoOptions; // create an object of type PhotoOptions

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private photoViewer: PhotoViewer, private chatProvider: ChatProvider, private loadingCtrl: LoadingController,
    private af: AngularFirestore) {
    this.photoOptions = new PhotoOptions(this.photoViewer, undefined); // a new instance of PhotoOptions, note there is 'undefined' TypeScript standard
    this.book = navParams.get('book'); // get the specific book from BuyBuyPage
    this.loadingMessage = new LoaderMessages(this.loadingCtrl);
  }

  // initialize the map with lat and lng coordinates
  private initMap() {
    let theMapLocation = new google.maps.LatLng(this.book.lat, this.book.lng);
    let mapOptions = {
      center: theMapLocation,
      zoom: 15
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    this.addMarker(theMapLocation, this.map);
  }

  // add a marker on the map on the position
  private addMarker(position: any, map: any) {
    return new google.maps.Marker({
      position,
      map
    });
  }

  // load the map when entring the page
  private ionViewDidLoad() {
    this.initMap();
  }

  // navigate to page depend on which page
  navigateToPage(page: any) {
    this.loadingMessage.presentLoader("Setting up chat");
    this.af.collection(this.af.app.auth().currentUser.uid).doc('messages').collection('myMessages').ref.where('chatId', '==', this.book.id)
    .get().then((doc) => {

        if (!doc.empty) {
            //ERROR message.
            let chat = new Chat(this.book.id, this.book.bookTitle, new Date().getTime());
            this.navCtrl.push(page, {chat: chat});
        } else {
          this.setUpChat(page);
        }
        this.loadingMessage.dismissLoader();
    });

  }

  hideContactSellerBtn() {
    return this.book.userId !== this.af.app.auth().currentUser.uid;
  }

  private setUpChat(page: any) {
    this.chatProvider.setChatInfoToSeller(this.book.userId, this.book.id, this.book.bookTitle, () => {
      this.chatProvider.setChatInfoToBuyer(this.book.id, this.book.bookTitle, () => {
        this.loadingMessage.dismissLoader();
        let chat = new Chat(this.book.id, this.book.bookTitle, new Date().getTime());
        this.navCtrl.push(page, {chat: chat});
      });
    });
  }

}
