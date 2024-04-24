import { Component, OnInit } from '@angular/core';
import { ScriptsService } from '../../services/client/scripts.service';
import { CartService } from '../../services/order/cart.service';
declare const $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  id: string = `CartModal${this.scriptService.generateRandomAlphanumeric(15)}`;
  checkoutid: string = `Checkout0662`;
  items: any[] = [];
  constructor(private scriptService: ScriptsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.items.subscribe(items => this.items = items);
  }
  show() {
    $(`#${this.id}`).appendTo("body").modal('show');
  }
  closemodal() {
    this.cartService.clear();
    $(`#${this.id}`).modal('toggle');
  }
  checkoutmodal() {
    this.scriptService.changePage('order');
    $(`#${this.id}`).modal('toggle');
    document.getElementById('Checkout0662btn')?.click();
  }
  remove(id: any) {
    this.cartService.remove(id);
  }
  get total() {
    return this.items.reduce((n, { price }) => parseFloat(n) + parseFloat(price), 0);
  }
}
