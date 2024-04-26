import { catchError } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { ScriptsService } from '../../services/client/scripts.service';
import { CartService } from '../../services/order/cart.service';
import { DeviceService } from '../../services/client/device.service';
import { FileService } from '../../services/client/file.service';
import { throwError } from 'rxjs';
import { OrderService } from '../../services/order/order.service';
declare const $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Input('hide') hide: boolean = true;
  id: string = `Checkout0662`;
  btnid: string = `Checkout0662btn`;
  items: any[] = [];
  deliveryopt: any = null;
  image: any = null;
  fileToUpload: any = null;
  order: any = {
    delivery: null,
    email: null,
    name: null,
    phone: null,
    cart: null,
    description: null,
    image: null,
    total: null,
  }
  successorder: any = null;
  constructor(private scriptService: ScriptsService, private cartService: CartService, private ds: DeviceService, private _fs: FileService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.cartService.items.subscribe(items => this.items = items);
  }
  show() {
    $(`#${this.id}`).appendTo("body").modal({
      backdrop: 'static',
      keyboard: false,
    }).modal('show');
  }
  closemodal() {
    this.deliveryopt = null;
    this.image = null;
    this.fileToUpload = null;
    this.order = {
      delivery: null,
      email: null,
      name: null,
      phone: null,
      cart: null,
      description: null,
      image: null,
      total: null,
    }
    this.successorder = null;
    $(`#${this.id}`).modal('toggle');

  }
  remove(id: any) {
    this.cartService.remove(id);
  }
  handleClicked(event: any) {
    console.log(event);
    this.deliveryopt = event
  }
  get total() {
    return this.items.reduce((n, { price }) => parseFloat(n) + parseFloat(price), 0);
  }
  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);
    const fileToUpload = this.fileToUpload;
    let formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.ds.oInfoNotification('Uploading', 'Please wait while we upload your image.');
    this._fs.upload(formData)
      .pipe(
        catchError((err: any) => {
          this.ds.hideSpinner();
          this.ds.oErrorNotification('Issues uploading', 'Issues with uploading the selected image. Please select another file');
          return throwError(err);
        })
      )
      .subscribe(
        f => {
          this.ds.hideSpinner();
          this.ds.oSuccessNotification('Company Icon Uploaded', 'Successfully saved company icon for upload')
          this.image = f.file;
        }
      )
  }
  confirmorder() {
    if (!this.scriptService.validateEmail(this.order.email)) {
      this.ds.oErrorNotification('Invalid', 'Email is invalid');
      return;
    }
    this.order.delivery = this.deliveryopt;
    this.order.cart = this.items;
    this.order.total = this.total;
    this.order.image = this.image;
    this.order.name = this.scriptService.encryptSha256(JSON.stringify(this.items));
    this.ds.showSpinner();
    this.orderService.create(this.order).subscribe(
      o => {
        console.log(o);
        this.ds.oSuccessNotification(o.message, 'Thank you for your patronage, your order is being processed');
        this.ds.hideSpinner();
        this.successorder = o.data;
        this.cartService.clear();
      },
      (error: any) => {
        this.ds.oErrorNotification('Opss', 'Something went wrong, we couldnt process this order');
      },
      () => this.ds.hideSpinner()
    )
  }
  onPrint() {
    window.print();
  }


}
