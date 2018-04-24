import { NgModule } from '@angular/core';
import { VisitsPipe } from './visits/visits';
import { DayOfWeekPipe } from './day-of-week/day-of-week';
@NgModule({
	declarations: [VisitsPipe,
    DayOfWeekPipe],
	imports: [],
	exports: [VisitsPipe,
    DayOfWeekPipe]
})
export class PipesModule {
	static forRoot() {
		return {
			ngModule: PipesModule,
			providers: [VisitsPipe, DayOfWeekPipe],
		};
	 }
}
