import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DataServiceProvider {

  protected data: any;
  constructor(private afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  // If you need get user data as promise

  public load(): Promise<any> {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.getUserData()
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getUserData(): Observable<any> {
    return  this.afDB.list('users', ref => ref.orderByChild('id').equalTo(this.afAuth.auth.currentUser.uid)).valueChanges();
  }
  
  getUserWeekMenu(): Observable<any> {
    return  this.afDB.list('menu', ref => ref.orderByChild('userId').equalTo(this.afAuth.auth.currentUser.uid)).valueChanges();
  }

  getDish(dishID): Observable<any> {
    return this.afDB.object('dishs/' + dishID).valueChanges().take(1);
  }

  getElement(elementID): Observable<any> {
    return this.afDB.object('elements/' + elementID).valueChanges().take(1);
  }

  getUnit(unitID): Observable<any> {
    return this.afDB.object('units/' + unitID).valueChanges().take(1);
  }

  getWithSkip(observ: Observable<any>, skip: number = 1): Observable<any>{
    return observ.skip(skip);
  }

}
