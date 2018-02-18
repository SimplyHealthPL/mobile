import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  iconPath: string = '../../assets/iconsPng/';
  icon: string = 'home.png';
  userData: any;
  loading: boolean = true;
  constructor(public navCtrl: NavController, private dataService: DataServiceProvider) {
  }

  ngOnInit(){
    this.loadData();
  }

  private loadData(): void{
    this.dataService.load().then(d => {
      this.userData = d[0];
      this.loading = false;
    }).catch(e => {
      console.log(e);
    });
  }

}
