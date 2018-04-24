import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import Chart from 'chart.js';

/**
 * Generated class for the WeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-weight',
  templateUrl: 'weight.html',
})
export class WeightPage {
  @ViewChild('chart') chart: ElementRef;
  icon: string;
  loading: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icon = './assets/iconsPng/list.png';
  }

  ngAfterViewInit() {
    this.initChart();
  }

  initChart(){
    new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
          labels: ["1 tydz", "2 tydz", "3 tydz", "4 tydz", "5 tydz", "6 tydz"],
          datasets: [{
              data: [88, 86, 89, 85, 83, 80],
              backgroundColor: [
                'rgba(255, 99, 132, 0)'
            ],
              borderColor: [
                  'rgba(10,182,162,1)'
              ],
              borderWidth: 1,
              pointRadius: 3,
              pointBorderWidth: 1,
              pointBackgroundColor: 'rgba(255,255,255,1)',
              pointBorderColor: 'rgba(10,182,162,1)'
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:false
                  }
              }]
          },
          legend: {
            display: false
          }
      }
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
