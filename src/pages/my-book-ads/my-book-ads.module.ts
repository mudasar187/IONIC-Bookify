import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookAdsPage } from './my-book-ads';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MyBookAdsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBookAdsPage),
    ComponentsModule,
    PipesModule
  ],
})
export class MyBookAdsPageModule {}
