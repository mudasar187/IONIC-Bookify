import { Component, Input } from '@angular/core';

/**
 * My own custom header for all pages
 * This is for avoiding use same code in all pages
 */
@Component({
  selector: 'custom-header',
  templateUrl: 'custom-header.html'
})
export class CustomHeaderComponent {

  @Input() pageName: string; // Takes name on the page user is located at and set the name to header navbar

  constructor() {
  }

}
