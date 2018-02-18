import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class Main {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  permision: boolean = false;
  iconPath: string = './assets/iconsPng/';
  pages: Array<{title: string, component: any, icon: string, active: boolean}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth,  private storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Strona główna', component: HomePage, icon: 'home.png',active: true },
      { title: 'Lista zakupów', component: HomePage, icon: 'list.png',active: false }
    ];

  }

  checkUser(){
    this.afAuth.auth.onAuthStateChanged(userState => {
      if (userState){
        this.permision = true;
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
}
