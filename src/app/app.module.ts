import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
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
import { ComponentsModule } from '../components/components.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import env from '../env/env';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPageModule } from '../pages/reset-password/reset-password.module';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { RegisterPageModule } from '../pages/register/register.module';
import { RegisterPage } from '../pages/register/register';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { PlaceProvider } from '../providers/place/place';
import { HttpClientModule } from '@angular/common/http';
import { BookProvider } from '../providers/book/book';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DetailPageModule } from '../pages/detail/detail.module';
import { DetailPage } from '../pages/detail/detail';
import { ApiProvider } from '../providers/api/api';
import { MyBookAdsPageModule } from '../pages/my-book-ads/my-book-ads.module';
import { MyBookAdsPage } from '../pages/my-book-ads/my-book-ads';
import { ChatPageModule } from '../pages/chat/chat.module';
import { ChatPage } from '../pages/chat/chat';
import { ChatProvider } from '../providers/chat/chat';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BuyBookPageModule,
    MessagesPageModule,
    ProfilePageModule,
    SellBookPageModule,
    TabControllerPageModule,
    ComponentsModule,
    ResetPasswordPageModule,
    RegisterPageModule,
    DetailPageModule,
    MyBookAdsPageModule,
    AngularFireModule.initializeApp(env), // Initalize the environment .ts file
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    ChatPageModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    BuyBookPage,
    SellBookPage,
    ProfilePage,
    MessagesPage,
    TabControllerPage,
    ResetPasswordPage,
    RegisterPage,
    DetailPage,
    MyBookAdsPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    PhotoViewer,
    Geolocation,
    PlaceProvider,
    BookProvider,
    BarcodeScanner,
    ApiProvider,
    ChatProvider
  ]
})
export class AppModule { }
