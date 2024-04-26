import { switchMap, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { ActivatedRoute } from '@angular/router';
import { MealService } from 'src/app/shared/services/meal/meal.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  // Pick from the url stream and get the code in the route represented as :code in the route label
  urlCode: Observable<any> = this.route.params.pipe(
    map(params => params.query)
  );
  // Pick a value from the urlCode once it emits a true value
  order: Observable<any> = this.urlCode.pipe(
    // Switch the observable by canceling the previous and changing to an api stream call
    switchMap((code: any) => this.orderService.read(code))
  )
  now: any = Date.now();
  rand:string = ""+this.scriptService.hashFnv32a(`${this.scriptService.generateRandomAlphanumeric(20)}`,true, this.now)
  constructor(private formBuilder: FormBuilder, private ds: DeviceService, private scriptService: ScriptsService, private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.ds.showSpinner();
    this.order.subscribe(m => {
      this.ds.hideSpinner()
    })
  }

  hashemail(s:string) {
    var i = s.indexOf('@');
    var startIndex = i * .2 | 0;
    var endIndex   = i * .9 | 0;
    return s.slice(0, startIndex) +
           s.slice(startIndex, endIndex).replace(/./g, this.rand) +
           s.slice(endIndex);
  }
  addToCart() {
    // Add your logic to add selected quantity to cart

  }

  changePage() {
    this.scriptService.changePage('order')
  }
  print(){
    window.print();
  }
}

