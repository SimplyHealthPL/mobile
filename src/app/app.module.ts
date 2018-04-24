import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Main } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DishPage } from '../pages/dish/dish';
import { ValuePage } from '../pages/value/value';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { WeightPage } from '../pages/weight/weight';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    Main,
    HomePage,
    LoginPage,
    DishPage,
    ValuePage,
    ShoppingListPage,
    WeightPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Main),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
    PipesModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Main,
    HomePage,
    LoginPage,
    DishPage,
    ValuePage,
    ShoppingListPage,
    WeightPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    DataServiceProvider,
    LocalNotifications,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
