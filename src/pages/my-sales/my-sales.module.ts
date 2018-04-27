import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySalesPage } from './my-sales';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MySalesPage,
  ],
  imports: [
    IonicPageModule.forChild(MySalesPage),
    ComponentsModule
  ],
})
export class MySalesPageModule { }
