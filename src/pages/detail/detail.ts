import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Book } from '../../models/Book';

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

  private map: any; // create a variable to hold the map
  book: Book; // create an object of type Book

  constructor(private navCtrl: NavController,
    private navParams: NavParams) {
    this.book = navParams.get('book'); // get the specific book from BuyBuyPage
  }

  // initialize the map with lat and lng coordinates
  private initMap() {
    let theMapLocation = new google.maps.LatLng(59.915939, 10.76036);
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
