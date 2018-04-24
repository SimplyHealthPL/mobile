import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import * as moment from 'moment';
import 'moment/locale/pl';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  icon: string;
  shoppingList: Array<{element: object, unit: object, amount: number, elementId: string, active: boolean}>;
  elementsId: Array<any>;
  loading: boolean = true;
  dayStart =  moment().format('dd');
  dayEnd =  moment().add(2, 'days').format('dd');

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataServiceProvider, private storage: Storage) {
    this.icon = './assets/iconsPng/list.png';
    this.shoppingList = [];
    this.elementsId = [];
  }

  ngOnInit(){
    this.loadData();
  }

  private loadData(): void{
    this.storage.get('shoppingList').then(data => {
      if(data){
        this.shoppingList = data;
        this.loading = false;
        this.dataService.getWithSkip(this.dataService.getUserWeekMenu()).subscribe(menu => {
          this.shoppingList = [];
          this.setShoppingList(menu[0]);
          console.log('subscribe works2');
        });
      }else{
        this.dataService.getUserWeekMenu().subscribe(menu => {
          this.setShoppingList(menu[0]);
          console.log('subscribe works');
        });
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  setShoppingList(menu){
      for(let i = 0; i < 3; i++){
        let day = moment().add(i, 'days').day();
        menu.days[day].forEach(meal => {
            this.getDish(meal.dishId);
        });
      }
      setTimeout(() => {
        this.storage.set('shoppingList', this.shoppingList);
        this.loading = false;
      }, 1000);
  }

  getDish(dishId){
    this.dataService.getDish(dishId).subscribe(data => {
      data.elements.forEach(el => {
        this.getItem(el);
      });
    });
  }

  async getItem(el){
    let item = {element: {}, unit: {}, amount: 0, elementId: '', active: true};
    let isInArray = this.elementsId.find(elementId => {
      return el.elementId == elementId;
    });
    if(!isInArray){
      try{
      await this.dataService.getElement(el.elementId).subscribe(element => {
          item.element = element;
        });
      await this.dataService.getUnit(el.unitId).subscribe(unit => {
          item.unit = unit;
        });
        item.amount = el.amount;
        item.elementId = el.elementId;
        this.elementsId.push(el.elementId);
        this.shoppingList.push(item);
      }
      catch(e){
        console.error(e);
      }
    }
    else{
      this.shoppingList.forEach(element => {
        if(element.elementId == el.elementId){
          element.amount += el.amount;
        }
      });
    }
  }

  changeActivity(elementId){
    this.shoppingList.forEach(element => {
      if(element.elementId == elementId){
        element.active = !element.active;
        this.storage.set('shoppingList', this.shoppingList);
      }
    });
  }

}
