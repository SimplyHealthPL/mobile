import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ValuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-value',
  templateUrl: 'value.html',
})
export class ValuePage {

  icon: string;
  elements: Array<{element: any, unit: any, amount: number}>;
  values: Array<any>;
  allergens: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.elements = navParams.get('elements');
    this.values = [];
    this.allergens = [];
    this.icon = './assets/iconsPng/dish.png';
  }

  ngOnInit(){
    this.loadData();
  }

  private loadData(): void{
    let carb = {name: 'Węglowodany', value: 0, unit: 'g'};
    let fat = {name: 'Tłuszcze', value: 0, unit: 'g'};
    let protein = {name: 'Białko', value: 0, unit: 'g'};
    let calories = {name: 'Kalorie', value: 0, unit: 'kcl'};
    this.elements.forEach(el => {

      carb.value = el.element.values.carb * el.amount * el.unit.scale;
      fat.value = el.element.values.fat * el.amount * el.unit.scale;
      protein.value = el.element.values.protein * el.amount * el.unit.scale;
      calories.value = el.element.values.calories * el.amount * el.unit.scale;
      this.allergens.push(el.element.allergen);
      
    });
    this.values.push(calories);
    this.values.push(protein);
    this.values.push(carb);
    this.values.push(fat);
    this.allergens = this.allergens.filter((v, i, a) => a.indexOf(v) === i); 
  }

}
