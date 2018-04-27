import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellBookPage } from './sell-book';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SellBookPage,
  ],
  imports: [
    IonicPageModule.forChild(SellBookPage),
    ComponentsModule
  ],
})
export class SellBookPageModule { }
