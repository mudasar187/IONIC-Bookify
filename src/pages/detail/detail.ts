import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Book } from '../../models/Book';
import { PhotoOptions } from '../../cameraOptions/PhotoOptions';
import { PhotoViewer } from '@ionic-native/photo-viewer';

declare var google: any;

/**
 * This class show details about the specific book choosen from BuyBookPage
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  @ViewChild('map') mapRef: ElementRef;

  private photoOptions: PhotoOptions; // create an object of type PhotoOptions
  private map: any; // create a variable to hold the map
  book: Book; // create an object of type Book

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private photoViewer: PhotoViewer,) {
      this.photoOptions = new PhotoOptions(this.photoViewer, null); // a new instance of PhotoOptions
    this.book = navParams.get('book'); // get the specific book from BuyBuyPage
  }

  // make picture bigger when user click on profile picture
  makeImageBigger(book: Book) {
    this.photoOptions.resizeImage(book.bookImage); // take the image url string in parameter
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




}
