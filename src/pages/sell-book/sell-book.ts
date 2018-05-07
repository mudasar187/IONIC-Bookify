import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, AlertController, Platform } from 'ionic-angular';
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
import { BarcodeScan } from '../../barcodeScanner/BarcodeScan';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * This class contains where a seller can add a book to a sale
 */

@IonicPage()
@Component({
  selector: 'page-sell-book',
  templateUrl: 'sell-book.html',
})
export class SellBookPage implements OnInit {

  previewImage: string = ""; // to hold previewImage base64 code
  bookForm: FormGroup; // create a form to validate
  book = {} as Book; // create an object of book
  bookIsNew = true; // set default value for checkBox

  private date: any;
  private userObject: any;
  private actionSheetMessages: ActionSheetMessages; // create an object of type ActionSheetsMessages
  private alertMessages: AlertMessages; // create an object of type AlertMessages
  private photoOptions: PhotoOptions; // create an object of type PhotoOptions
  private loadingMessages: LoaderMessages; // create an object of type LoaderMessages
  private barCodeScan: BarcodeScan; // create an object of type BarScodeScan
  private authors: [any];
  private title: string;
  private description: string;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private placeProvider: PlaceProvider,
    private af: AngularFirestore,
    private afStorage: AngularFireStorage,
    private bookProvider: BookProvider,
    private photoViewer: PhotoViewer,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private loaderCtrl: LoadingController,
    private alertCtrl: AlertController,
    private barCodeScanner: BarcodeScanner,
    private apiProvider: ApiProvider,
    private geoLocation: Geolocation) {

    this.actionSheetMessages = new ActionSheetMessages(this.actionSheetCtrl);
    this.photoOptions = new PhotoOptions(this.photoViewer, this.camera); // a new instance of PhotoOptions
    this.loadingMessages = new LoaderMessages(this.loaderCtrl); // a new instance of LoaderMessage
    this.alertMessages = new AlertMessages(this.alertCtrl); // a new instance of AlertMessages
    this.barCodeScan = new BarcodeScan(this.barCodeScanner);
    this.userObject = this.af.app.auth().currentUser;
  }

  // init the FormGroup validator
  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  // give user a options on which way to add a profilepicture
  // use camera or gallery
  presentActionSheet(title: string) {
    this.actionSheetMessages.presentActionSheet(title, () => {
      this.photoOptions.executeCamera((base64Img) => {
        this.previewImage = base64Img;
      });
    }, () => {
      this.photoOptions.getFromGallery((base64Img) => {
        this.previewImage = base64Img;
      });
    });
  }

  // get location and then add a book to book collection
  addBookToCollection(book: Book) {

    this.date = new Date().toLocaleDateString();

    // to ensure that we have a picture, if not then present a actionSheetController to tell user that user need to take a picture
    if (this.previewImage !== "") {
      // get lat, lng and adress
      this.loadingMessages.presentLoader('Legger bok til salgs...');
      this.placeProvider.findGeoLocation((lat, lng, adress) => {
        // generate a filename for the image we're going to upload based on user's email and second
        let imageFileName = `${this.userObject.email}_${new Date().getTime()}.png`;

        // make a task that upload the picture
        let task = this.afStorage
          .ref(`${this.userObject.email}`) // create a folder to upload image to user's folder named as user's email
          .child(imageFileName) // fileName for the file
          .putString(this.previewImage, 'base64', { contentType: 'image/png' }); // set as string

        // make a event to we can follow when the picture is uploaded
        let uploadEvent = task.downloadURL();

        // when the image is uploaded, we can now get the URL accsess and book is finished adding to databse
        // show user that picture is being updated and book is adding to collection
        uploadEvent.subscribe((uploadImgUrl) => {
          this.bookProvider.addBookToCollection(
            this.userObject.uid,
            this.userObject.displayName,
            this.userObject.photoURL,
            uploadImgUrl,
            book.bookIsbn,
            book.bookTitle,
            book.bookDescription,
            book.bookPrice,
            this.getBookStatus(book),
            false,
            adress,
            lat,
            lng,
            this.date);
          this.clearInputFields(); // clear input fields
          this.loadingMessages.dismissLoader(); // dismiss when its updated
        }, (err: any) => {
          this.loadingMessages.dismissLoader(); // dissmiss if any error
          this.alertMessages.presentAlert('Oppss.. Noe gikk galt..'); // show a error message
        });
      });
    } else {
      // present user to tell that user need to take a picture
      this.presentActionSheet('Du må ta bilde av boken');
    }
  }

  // To change the checkbox, if marking 'Ny' then unmark 'Brukt' and same the other way
  changeBookStatus() {
    this.bookIsNew = !this.bookIsNew;
  }

    // get status from the checkbox
    private getBookStatus(book: Book) {
      if (this.bookIsNew) {
        return book.bookConditions = "Ny";
      } else {
        return book.bookConditions = "Brukt";
      }
    }

  // method for barcode, when barcode is scanned and isbn number is added, then get information about the book from the API
  private barCodeAction(book: Book) {
    this.actionSheetMessages.presentActionSheetSellBookOptions(() => {
      this.barCodeScan.scanBarcode((barCodeData: any) => {
        //Show wait alert
        this.loadingMessages.presentLoader('Henter bok fra databasen'); // Loading information from the API database
        this.book.bookIsbn = barCodeData.text as string;
        this.getInfoFromApi(this.book.bookIsbn, (error) => {
          this.loadingMessages.dismissLoader(); // Dismiss loader when retriving information is finished
          if (error) {
              // Show message if there was no book found in the API
          }
        });
      }, () => {
        this.alertMessages.presentAlert('Kunne ikke finne kode, prøv igjen..'); // show a error message if barcode was not read
      });
    });
  }



  // clear the input fields when book is added for sale
  private clearInputFields() {
    this.book.bookIsbn = "";
    this.book.bookTitle = "";
    this.book.bookDescription = "";
    this.book.bookPrice = null;
    this.previewImage = "";
  }

  // To load a actionSheet for asking user if he/she want to manually create the book or by using barcode scanner
  private ionViewDidEnter() {
    this.barCodeAction(this.book);
  }



  // retrive information from the API by ISBN number
  private getInfoFromApi(isbn: string, done: (error: boolean) => void) {
      this.apiProvider.getInfoFromApi(isbn).then((success: any) => {
          let items = success.items[0].volumeInfo;
          this.book.bookTitle = items.title;
          this.book.bookDescription = items.description;
          this.authors = items.authors;
          this.title = items.title;
          this.description = items.description;
          done(false);
      }).catch((error) => {
          done(true);
      });
  }




}
