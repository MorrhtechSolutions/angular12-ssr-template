import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { MealService } from 'src/app/shared/services/meal/meal.service';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input('key') key: any = '';
  @Output('clicked') clicked: EventEmitter<any> = new EventEmitter();
  @Output('keyChanged') keyChanged: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private ds: DeviceService, private scriptService: ScriptsService, private mealService:MealService) { }

  ngOnInit(): void {
  }
  onNgModelChange($event) {
    if(this.key.length<1){
      this.keyChanged.emit('');
      this.clicked.emit(undefined);
      this.mealService.meals$.subscribe(
        result => {this.clicked.emit(result);this.ds.hideSpinner()},
        error => {
          console.log(error);
          this.ds.oErrorNotification('Opss', 'Something went wrong. Try again or contact the support')
        },
        () => this.ds.hideSpinner()
      )
    }
  }
  search() {
    if (this.key.length > 0) {
      this.keyChanged.emit(this.key);
      this.ds.showSpinner();
      this.mealService.meals$.pipe(
        map(meals=>meals.filter(m=>String(m.name).toLowerCase().includes(String(this.key).toLowerCase())))
      ).subscribe(
        result => {this.clicked.emit(result);this.ds.hideSpinner()},
        error => {
          console.log(error);
          this.ds.oErrorNotification('Opss', 'Something went wrong. Try again or contact the support')
        },
        () => this.ds.hideSpinner()
      )
    } else {
      this.ds.oInfoNotification('Required', 'Order ID is required');
      this.keyChanged.emit('');
      this.clicked.emit(undefined);
    }

    // this.router.navigate(['/order/view/'+'05'], { queryParams: { term: searchTerm } });
  }

}



