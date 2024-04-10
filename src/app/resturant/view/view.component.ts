import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  orderForm!: FormGroup;
  quantities: number[] = Array.from({length: 20}, (_, i) => i + 1); // Array from 1 to 20

  constructor(private formBuilder: FormBuilder, private ds: DeviceService, private scriptService: ScriptsService) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      quantity: [1, Validators.required] // Set default value to 1
    });
  }

  addToCart() {
    // Add your logic to add selected quantity to cart
    const selectedQuantity = this.orderForm.value.quantity;
    this.ds.oSuccessNotification('Added to cart', 'Added ' + selectedQuantity + ' to cart');
  }

  changePage(){
    this.scriptService.changePage('resturant')
  }
}
