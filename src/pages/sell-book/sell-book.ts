import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PlaceProvider } from '../../providers/place/place';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geoLocation: Geolocation,
    private placeProvider: PlaceProvider) {
  }


  findGeoLocation() {
    this.geoLocation.getCurrentPosition()
      .then(position => {
        this.placeProvider.getAddressBasedOnLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then((place: any) => {
          this.locationAddress = place.results[1].formatted_address;
        });
      }).catch(error => {
        console.error(error);
      });
  }

}
