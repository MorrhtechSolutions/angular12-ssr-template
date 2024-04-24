import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { Observable } from 'rxjs';
import { MealService } from 'src/app/shared/services/meal/meal.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  meals:Observable<any[]> = this.mealService.meals$;
  shuffles: any[] = [];
  searchResult:any = null;
  key:any = '';
  constructor(private ds: DeviceService, private scriptService: ScriptsService, private mealService: MealService) { }

  ngOnInit(): void {
    this.ds.showSpinner();
    this.mealService.fetch$.subscribe(
      (data: any) => { this.shuffles =data; },
      ()=>{},
      ()=>this.ds.hideSpinner()
    );
  }

  handleClicked($event){
    this.searchResult = $event;
    this.shuffles=this.searchResult;

  }
  keyChanged($event){
    this.key = $event;
  }
  showAddToCart(){
    this.ds.oSuccessNotification('Added to cart', 'You have successfully added this item to cart');
  }

  navigateTo(url:string){
    this.scriptService.changePage(url);
  }


}
