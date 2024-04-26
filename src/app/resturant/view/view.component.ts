import { switchMap, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { ActivatedRoute } from '@angular/router';
import { MealService } from 'src/app/shared/services/meal/meal.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  orderForm!: FormGroup;
  quantities: number[] = Array.from({ length: 20 }, (_, i) => i + 1); // Array from 1 to 20
  // Pick from the url stream and get the code in the route represented as :code in the route label
  urlCode: Observable<any> = this.route.params.pipe(
    map(params => params.query)
  );
  // Pick a value from the urlCode once it emits a true value
  meal: Observable<any> = this.urlCode.pipe(
    // Switch the observable by canceling the previous and changing to an api stream call
    switchMap((code: any) => this.mealService.read(code))
  )
  totalorders = this.scriptService.generateRandomAlphanumeric(5);
  constructor(private formBuilder: FormBuilder, private ds: DeviceService, private scriptService: ScriptsService, private route: ActivatedRoute, private mealService: MealService) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      quantity: [1, Validators.required] // Set default value to 1
    });
    this.ds.showSpinner();
    this.meal.subscribe(m => {
      console.log(m);
      this.ds.hideSpinner()
    })
  }
  get quantity(){
    return this.orderForm.controls.quantity.value;
  }

  addToCart() {
    // Add your logic to add selected quantity to cart
    const selectedQuantity = this.orderForm.value.quantity;
    this.ds.oSuccessNotification('Added to cart', 'Added ' + selectedQuantity + ' to cart');
  }

  changePage() {
    this.scriptService.changePage('resturant')
  }
}

