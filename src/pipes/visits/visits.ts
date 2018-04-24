import { Pipe, PipeTransform } from '@angular/core';
import { Visit } from '../../shered/models/visit';
import * as moment from 'moment';
import 'moment/locale/pl';
/**
 * Generated class for the VisitsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'visits',
  pure: false
})
export class VisitsPipe implements PipeTransform {
  /**
   * Returns visits array.
   */
  visits: Array<Visit>;
  constructor(){
    this.visits = [];
  }

  transform(value: any, ...args) {
    if(value){
      this.visits = [];
      value.forEach(el => {

        let slide = {day: '', month: '', info: ''};
        let date = moment(el.date, 'DD.MM.YYYY');

        slide.day = moment(date, 'DD.MM.YYYY').format('DD');
        slide.month = moment(date, 'DD.MM.YYYY').format('MMMM');

        if(el.type == "wizyta"){
          slide.info = 'Następna<br> wizyta w <br>poradni';
        }
        else {
          slide.info = ''
        }
        this.visits.push(slide);
      });
      return this.visits;
    }
  }
}
