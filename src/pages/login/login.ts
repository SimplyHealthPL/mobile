import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../shered/models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: boolean = false;
  user = {} as User;
  response: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private storage: Storage) {
    this.remembered();
  }

  remembered(){
    try {
      let userSaved = this.storage.get('user');
      userSaved.then(data => {
        if (data) {
          this.loading = true;
          this.user.email = data.email;
          this.user.password = data.password;
          this.login(data);
        }    
      });
    }
    catch(e){
      console.log(e);
    }
  }

  async login(user: User){
    this.response = '';
    this.loading = true;
    try {
      let result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.storage.set('user', user);
        this.navCtrl.setRoot(HomePage);
      }
      this.loading = false;
    }
    catch (e) {
      console.error(e);
      setTimeout(() => {
        this.user.email = '';
        this.user.password = '';
        this.loading = false;
        this.response = e.message;
      }, 600);
    }
  }

}
