import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BuyBookPageModule } from '../pages/buy-book/buy-book.module';
import { MessagesPageModule } from '../pages/messages/messages.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { SellBookPageModule } from '../pages/sell-book/sell-book.module';
import { BuyBookPage } from '../pages/buy-book/buy-book';
import { SellBookPage } from '../pages/sell-book/sell-book';
import { ProfilePage } from '../pages/profile/profile';
import { MessagesPage } from '../pages/messages/messages';
import { TabControllerPage } from '../pages/tab-controller/tab-controller';
import { TabControllerPageModule } from '../pages/tab-controller/tab-controller.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BuyBookPageModule,
    MessagesPageModule,
    ProfilePageModule,
    SellBookPageModule,
    TabControllerPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BuyBookPage,
    SellBookPage,
    ProfilePage,
    MessagesPage,
    TabControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
