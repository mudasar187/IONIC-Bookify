import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiKeys from '../../env/apiKeys'; // import the api key

/*
* This class is a provider for Google Maps
* Value we get here is location based on lat, lng and api key from Google
*/
@Injectable()
export class PlaceProvider {

  constructor(private http: HttpClient) {
  }

  // get adress based on lat and lng by using geoLocation
  getAddressBasedOnLatLng(lat: number, lng: number) {
    return new Promise((resolve, reject) => {
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${apiKeys.GOOGLE_API_KEY}`) // use Google Map
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
