import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { MealService } from 'src/app/shared/services/meal/meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  meals:Observable<any[]> = this.mealService.meals$;
  constructor(private scriptService: ScriptsService,
              private mealService:MealService,
              private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceService.showSpinner();
    this.mealService.fetch$.subscribe(
      ()=>{},
      ()=>{},
      ()=>this.deviceService.hideSpinner()
    );
  }

  changePage(){
    this.scriptService.changePage('resturant')
  }

}
