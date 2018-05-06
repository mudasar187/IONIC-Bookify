import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookAdsPage } from './my-book-ads';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyBookAdsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBookAdsPage),
    ComponentsModule
  ],
})
export class MyBookAdsPageModule {}
