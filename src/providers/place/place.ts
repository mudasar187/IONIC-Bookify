import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
* This class is a provider for Google Maps
* Value we get here is location based on lat, lng and api key from Google
*/
@Injectable()
export class PlaceProvider {



  constructor(private http: HttpClient,
    private geoLocation: Geolocation) {
  }

  // get location where user is right now this moment
  findGeoLocation(doneFetching: (lat: number, lng: number, adress: string) => void) {
    var lat: number;
    var lng: number;
    this.geoLocation.getCurrentPosition()
      .then(position => { // get position
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        this.getAddressBasedOnLatLng( // now get the location by calling this method
          position.coords.latitude, // insert lat
          position.coords.longitude // inser lng
        ).then((place: any) => { // place contains an array of different values for the lat and lng place
          doneFetching(lat, lng, place.results[1].formatted_address);
        }).catch((error) => {
          doneFetching(-99, -99, "Places API Error"); // if error
        });
      }).catch(error => {
        doneFetching(-99, -99, "GPS ERROR"); // if error
        console.error(error);
      });
  }

  // get adress based on lat and lng by using geoLocation
  private getAddressBasedOnLatLng(lat: number, lng: number) {
    return new Promise((resolve, reject) => {
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${this.GOOGLE_API_KEY}`) // use Google Map
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        )
    });
  }

}
