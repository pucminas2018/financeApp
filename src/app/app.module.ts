import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { Categories } from '../mocks/providers/categories';
import { Invoices } from '../mocks/providers/invoices';
import { CreditCards } from '../mocks/providers/credit-cards';
import { AccountTypes } from '../mocks/providers/account-types';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { RegAccounts } from '../mocks/providers/reg-accounts';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    Categories,
    Invoices,
    RegAccounts,
    CreditCards,
    AccountTypes,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
