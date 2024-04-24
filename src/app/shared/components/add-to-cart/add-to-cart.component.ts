import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/order/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input('item') item: any = null;
  @Input('quantity') quantity: any = 1;
  added:boolean = false;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.check();
  }
  clicked(){
    this.item = {
      ...this.item,
      quantity: this.quantity
    }
    this.cartService.add(this.item);
    this.check();
  }
  private check(){
    if(this.cartService.exist(this.item.id)){
      this.added = true;
    }
  }

}
