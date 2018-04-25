import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Book provider class
  Contains all operations against book collection
*/
@Injectable()
export class BookProvider {

  constructor(public http: HttpClient) {
    
  }

}
