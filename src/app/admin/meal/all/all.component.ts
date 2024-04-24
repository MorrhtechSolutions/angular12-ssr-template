import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { MealService } from 'src/app/shared/services/meal/meal.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  meals: Observable<any[]> = this.mealService.meals$;
  shuffles: any[] = [];
  searchResult: any = null;
  key: any = '';
  currentPage: any = 1;
  constructor(private ds: DeviceService, private scriptService: ScriptsService, private mealService: MealService) { }

  ngOnInit(): void {
    this.ds.showSpinner();
    this.mealService.fetch$.subscribe(
      (data: any) => { this.shuffles = data; },
      () => { },
      () => this.ds.hideSpinner()
    );
  }

  changePage() {
    this.scriptService.changePage('/admin/meal/create')
  }

}
