import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
*
*/
@Injectable()
export class PlaceProvider {



  constructor(private http: HttpClient) {
  }

  getAddressBasedOnLatLng(lat: number, lng: number) {
    return new Promise((resolve, reject) => {
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${this.GOOGLE_API_KEY}`)
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
