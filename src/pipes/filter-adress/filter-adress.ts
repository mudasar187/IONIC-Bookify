import { Pipe, PipeTransform } from '@angular/core';

/**
 * Make a pipe so i can decide how i want to show the adress
 * Adress looks like this -> Nylandveien, 0186 Oslo, Norge
 * I created this pipe so i can only show -> Nylandsveien, 0186 Oslo and filter out Norge
 */

@Pipe({
  name: 'filterAdress',
})
export class FilterAdressPipe implements PipeTransform {

  // transform the adress
  transform(value: string, ...args) {
    let adress = value;
    let splitAdress = adress.split(",");
    let place = splitAdress[0];
    let postCodeAndCity = splitAdress[1];
    return place + " , " + postCodeAndCity;
  }
}
