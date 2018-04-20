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
import { UserCollectionProvider } from '../providers/user-collection/user-collection';
import { ToastMessage } from '../toastMessages/ToastMessage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage
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
    AngularFireModule.initializeApp(env), // Initalize the environment .ts file
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
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
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserCollectionProvider
  ]
})
export class AppModule { }
