import { Component, Input } from '@angular/core';

/**
 * Custom header class
 * To avoid use same code on all pages
 * This custom header can be styled as you want and reuse it on all pages with help of @Input()
 */
@Component({
  selector: 'custom-header',
  templateUrl: 'custom-header.html'
})
export class CustomHeaderComponent {

  @Input() pageName: string; // Takes name on the page user is located at and set the name to header navbar

  constructor() { }

}
