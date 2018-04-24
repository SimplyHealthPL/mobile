import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { VisitsPipe } from '../../pipes/visits/visits';
import { Visit } from '../../shered/models/visit';
import { DishPage } from '../dish/dish';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public icon: string;
  public userData: any;
  public userWeekMenu: any;
  public loading: boolean = true;
  public mainSlides: Array<Visit>;
  public dishs: {dishId: Array<any>};

  constructor(public navCtrl: NavController, private dataService: DataServiceProvider, private visit: VisitsPipe) {
    this.mainSlides = [];
    this.userWeekMenu = [];
    this.dishs = {dishId: []};
    this.icon = './assets/iconsPng/home.png';
  }

  ngOnInit(){
    this.loadData();
  }

  private loadData(): void{
    this.dataService.getUserData().subscribe(data => {
      this.userData = data[0];
      this.processingUser(this.userData);
    });
    
    this.dataService.getUserWeekMenu().subscribe(data => {
      this.userWeekMenu = data[0];
    });
  }

  private processingUser(userInfo): void{
    this.mainSlides = this.visit.transform(userInfo.calendar);
    this.loading = false;
  }

  showDish(dishId){
    this.navCtrl.push(DishPage, {
      dishId: dishId
    });
  }

}
