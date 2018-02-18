import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DataServiceProvider {

  protected data: any;
  constructor(private afDB: AngularFireDatabase, private af: AngularFireAuth ) {
  }

  public load(): Promise<any> {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.getUser(this.af.auth.currentUser.uid)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getUser(uid): Observable<any> {
    return  this.afDB.list('users', ref => ref.orderByChild('id').equalTo(uid)).valueChanges();
  }
/*
  getHotel(hotelId): Observable<any> {
    return this.afDB.list('hotels', ref => ref.orderByChild('id').equalTo(hotelId)).valueChanges();
  }
  getHappenings(eventId): Observable<any> {
      return this.afDB.list('happenings/' + eventId + '/days', ref => ref.orderByChild('date')).valueChanges();
  }
  getTravel(): Observable<any> {
    return this.afDB.list('travels').valueChanges();
  }
*/
}
