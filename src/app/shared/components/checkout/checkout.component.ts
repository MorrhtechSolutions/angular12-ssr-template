import { catchError } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { ScriptsService } from '../../services/client/scripts.service';
import { CartService } from '../../services/order/cart.service';
import { DeviceService } from '../../services/client/device.service';
import { FileService } from '../../services/client/file.service';
import { throwError } from 'rxjs';
declare const $:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Input('hide') hide:boolean = true;
  id:string =  `Checkout0662`;
  btnid:string =  `Checkout0662btn`;
  items:any[] = [];
  deliveryopt:any = null;
  image:any = null;
  fileToUpload:any = null;
  constructor(private scriptService: ScriptsService, private cartService: CartService, private ds: DeviceService, private _fs: FileService) { }

  ngOnInit(): void {
    this.cartService.items.subscribe(items=>this.items=items);
  }
  show(){
    $(`#${this.id}`).appendTo("body").modal({
      backdrop: 'static',
      keyboard: false,
    }).modal('show');
  }
  closemodal(){
    $(`#${this.id}`).modal('toggle');
  }
  remove(id:any){
    this.cartService.remove(id);
  }
  handleClicked(event:any){
    console.log(event);
    this.deliveryopt = event
  }
  get total(){
    return this.items.reduce((n, {price}) => parseFloat(n) + parseFloat(price), 0);
  }
  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);
    const fileToUpload = this.fileToUpload;
    let formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.ds.oInfoNotification('Uploading','Please wait while we upload your image.');
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
  

}
