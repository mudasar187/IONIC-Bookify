import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyBookPage } from './buy-book';

@NgModule({
  declarations: [
    BuyBookPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyBookPage),
  ],
})
export class BuyBookPageModule {}
