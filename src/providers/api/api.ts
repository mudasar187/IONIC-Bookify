import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
* This class contains operation to get information from the API
*/
@Injectable()
export class ApiProvider {

  constructor(private http: HttpClient) {
  }

  // retrive information from the API by using isbn number
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
