import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PlaceProvider } from '../../providers/place/place';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Book } from '../../models/Book';
import { BookProvider } from '../../providers/book/book';
import { ActionSheetMessages } from '../../popUpMessages/actionSheets/ActionSheetMessages';
import { PhotoOptions } from '../../cameraOptions/PhotoOptions';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera } from '@ionic-native/camera';
import { AlertMessages } from '../../popUpMessages/alertMessages/AlertMessages';
import { LoaderMessages } from '../../popUpMessages/loaderMessages/LoaderMessages';

/**
 * This class contains where a seller can add a book to a sale
 */

@IonicPage()
@Component({
  selector: 'page-sell-book',
  templateUrl: 'sell-book.html',
})
export class SellBookPage {

  locationAddress: string;
  previewImage: string = "";
  userObject: any;
  book = {} as Book;

  actionSheetMessages: ActionSheetMessages; // create an object of type ActionSheetsMessages
  alertMessages: AlertMessages; // create an object of type AlertMessages
  photoOptions: PhotoOptions; // create an object of type PhotoOptions
  loadingMessages: LoaderMessages; // create an object of type LoaderMessages

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geoLocation: Geolocation,
    private placeProvider: PlaceProvider,
    private af: AngularFirestore,
    private afStorage: AngularFireStorage,
    private bookProvider: BookProvider,
    private photoViewer: PhotoViewer,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private loaderCtrl: LoadingController,
    private alertCtrl: AlertController) {

    this.actionSheetMessages = new ActionSheetMessages(this.actionSheetCtrl);
    this.photoOptions = new PhotoOptions(this.photoViewer, this.camera); // a new instance of PhotoOptions
    this.loadingMessages = new LoaderMessages(this.loaderCtrl); // a new instance of LoaderMessage
    this.alertMessages = new AlertMessages(this.alertCtrl); // a new instance of AlertMessages
    this.userObject = this.af.app.auth().currentUser;
  }

  // give user a options on which way to add a profilepicture
  // use camera or gallery
  presentActionSheet() {
    this.actionSheetMessages.presentActionSheet(() => {
      this.photoOptions.executeCamera((base64Img) => {
        this.previewImage = base64Img;
      });
    }, () => {
      this.photoOptions.getFromGallery((base64Img) => {
        this.previewImage = base64Img;
      });
    });
  }

  // add a book to book collection
  addBookToCollection() {

    // Her genererer vi et filnavn for bildet vi skal laste opp, basert på innlogget brukers email-adresse og sekunder siden UNIX epoch (1.1.1970).
    let imageFileName = `${this.userObject.email}_${new Date().getTime()}.png`;

    // make a task that upload the picture
    let task = this.afStorage
      .ref(`${this.userObject.email}`) // create a folder to upload image to user's folder named as user's email
      .child(imageFileName) // fileName for the file
      .putString(this.previewImage, 'base64', { contentType: 'image/png' }); // set as string

    // Så lager vi en event vi kan bruke for å lytte på når bildet er ferdig lastet opp
    let uploadEvent = task.downloadURL();

    // when the image is uploaded, we can now get the URL accsess
    this.loadingMessages.presentLoader('Legger bok til salgs...'); // show user that picture is being updated

    // Her lytter vi på når bildet er ferdig lastet opp. Når det er det, får vi tilgang til bildets URL på serveren til Firebase
    uploadEvent.subscribe((uploadImgUrl) => {
      this.bookProvider.addBookToCollection(this.userObject.uid,
        this.userObject.displayName,
        uploadImgUrl,
        "title",
        "200",
        this.locationAddress,
        "brukt");
      this.loadingMessages.dismissLoader(); // dismiss when its updated
    }, (err: any) => {
      this.loadingMessages.dismissLoader(); // dissmiss if any error
      this.alertMessages.presentAlert('Oppss.. Noe gikk galt...') // show a error message
    });
  }

  // get location where user is right now this moment
  findGeoLocation() {
    this.geoLocation.getCurrentPosition()
      .then(position => { // get position
        this.placeProvider.getAddressBasedOnLatLng( // now get the location by calling this method
          position.coords.latitude, // insert lat
          position.coords.longitude // inser lng
        ).then((place: any) => { // place contains an array of different values for the lat and lng place
          this.locationAddress = place.results[1].formatted_address; // we want index 1 and save it to a string, can also get other index'es
        });
      }).catch(error => {
        console.error(error);
      });
  }

}
