import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyBookPage } from './buy-book';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    BuyBookPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyBookPage),
    ComponentsModule,
    PipesModule
  ],
})
export class BuyBookPageModule { }
