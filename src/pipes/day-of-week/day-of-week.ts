import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pl';

/**
 * Generated class for the DayOfWeekPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dayOfWeek',
})
export class DayOfWeekPipe implements PipeTransform {
  /**
   * Takes a value and returns day's name of week.
   */
  transform(value: number, ...args) {
    return moment().weekday(value).format('dddd');
  }
}
