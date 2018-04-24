import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Dish } from '../../shered/models/dish';
import { ValuePage } from '../value/value';

/**
 * Generated class for the DishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dish',
  templateUrl: 'dish.html',
})
export class DishPage {

  info: string;
  dishId: any;
  dish: Dish;
  portion: number = 1;
  elements: Array<{element: object, unit: object, amount: number}>;
  icon: string;
  loading: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataServiceProvider) {
    this.dishId = navParams.get('dishId');
    this.icon = './assets/iconsPng/dish.png';
    this.info = './assets/iconsPng/info.png';
    this.elements = [];
  }

  ngOnInit(){
    this.loadData();
  }

  private loadData(): void{
    this.dataService.getDish(this.dishId).subscribe(data => {
      this.dish = data;
      this.dish.elements.forEach(el => {
        this.getItem(el);
      });
      this.loading = false;
    });
  }

  async getItem(el){
    let item = {element: {}, unit: {}, amount: 0};
    try{
     await this.dataService.getElement(el.elementId).subscribe(element => {
        item.element = element;
      });
     await this.dataService.getUnit(el.unitId).subscribe(unit => {
        item.unit = unit;
      });
      item.amount = el.amount;
      this.elements.push(item);
    }
    catch(e){
      console.error(e);
    }
  }

  incrementPortion(){
    if(this.portion < 10){
      this.portion++;
      this.elements.forEach(el => {
        el.amount = el.amount/(this.portion-1)*this.portion;
      });
    }
  }

  decrementPortion(){
    if(this.portion > 1){
      this.portion--;
      this.elements.forEach(el => {
        el.amount = el.amount/(this.portion+1)*this.portion;
      });
    }
  }

  showValue(){
    this.navCtrl.push(ValuePage, {
      elements: this.elements
    });
  }

}
