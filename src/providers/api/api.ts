import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {

  }

  public getInfoFromApi(isbn: string) {
    let urlRequest = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
    return new Promise((resolve, reject) => {
      this.http.get(urlRequest).subscribe((response) => {
          resolve(response);
      }, (error) => {
          reject(error);
      });
    });
  }

}
