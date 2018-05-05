import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySalesAndBuysPage } from './my-sales-and-buys';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MySalesAndBuysPage,
  ],
  imports: [
    IonicPageModule.forChild(MySalesAndBuysPage),
    ComponentsModule
  ],
})
export class MySalesAndBuysPageModule {}
