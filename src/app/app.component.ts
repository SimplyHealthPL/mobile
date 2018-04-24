import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { WeightPage } from '../pages/weight/weight';

@Component({
  templateUrl: 'app.html'
})
export class Main {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  permision: boolean = false;
  iconPath: string = './assets/iconsPng/';
  pages: Array<{title: string, component: any, icon: string, active: boolean}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth,  private storage: Storage, private backgroundMode: BackgroundMode, private localNot: LocalNotifications, private dataServie: DataServiceProvider) {
    this.initializeApp();
    this.backgroundMode.setDefaults({ silent: true });
    this.backgroundMode.overrideBackButton();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Strona główna', component: HomePage, icon: 'home.png',active: true },
      { title: 'Lista zakupów', component: ShoppingListPage, icon: 'list.png',active: false },
      { title: 'Waga', component: WeightPage, icon: 'weight.png',active: false }
    ];

  }

  checkUser(){
    this.afAuth.auth.onAuthStateChanged(userState => {
      if (userState){
        this.permision = true;
        this.backgroundMode.enable();
        this.checkUpdates();
      }else{
        this.permision = false;
        this.rootPage = LoginPage;
        this.storage.remove('user');
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkUser();
    });
  }

  changeActivePage(page){
    page.active = true;
    this.pages.filter(el => {
      if(el.component === this.nav.getActive().component && el.component != page.component){
        el.active = false;
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.changeActivePage(page);
    this.nav.setRoot(page.component);
  }

  checkUpdates(){
    this.backgroundMode.on('enable').subscribe(() => {
      this.dataServie.getUserWeekMenu().skip(1).subscribe(() => {
        this.localNot.schedule({
          title: 'Nowe Menu!',
          text: 'Twój dietetyk wprowadził zmiany, sprawdź ;)'
        });
      });
    });
  }
}
