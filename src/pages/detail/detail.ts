import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Book } from '../../models/Book';

declare var google: any;

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  @ViewChild('map') mapRef: ElementRef;
  private map: any;

  public book: Book;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("book: " + JSON.stringify(navParams.get('book')));
    this.book = navParams.get('book');
  }

  ionViewDidLoad() {
    this.initMap();
  }

  private initMap() {
      let theMapLocation = new google.maps.LatLng(59.915939, 10.76036);
      let mapOptions = {
        center: theMapLocation,
        zoom: 15
      }

      this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

      this.addMarker(theMapLocation, this.map);
  }

  private addMarker(position: any, map: any) {
    return new google.maps.Marker({
        position,
        map
    });
  }




}
