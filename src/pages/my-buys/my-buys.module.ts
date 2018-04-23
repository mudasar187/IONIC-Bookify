import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBuysPage } from './my-buys';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyBuysPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBuysPage),
    ComponentsModule
  ],
})
export class MyBuysPageModule {}
