import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabControllerPage } from '../tab-controller/tab-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToTabControllerPage() {
    this.navCtrl.push(TabControllerPage);
  }

}
