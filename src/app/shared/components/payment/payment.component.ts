import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AsyncPaymentOptions, Flutterwave, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { environment } from 'src/environments/environment';
import { DeviceService } from '../../services/client/device.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  id:any;
  exchange:any = 0.000352;
  pounds:any = 0.000152;
  naira:any = 0.5;
  @Input('highlightedText') highlightedText:string = 'Review Payment';
  @Input('ztcamount') ztcamount:any;
  exchanges = {
    dollar: this.exchange,
    pounds: this.pounds,
    naira: this.naira,
    selected: 'dollar'
  }
  publicKey = environment.flutter_public_key;
  customizations = { title: 'Payment', description: '', logo: '' }
  meta = {
    'counsumer_id': '',
    'consumer_mac': ''
  }
  user: any = null;

  //updated by the checkout()
  customerDetails = {
    name: '',
    amount: 0,
    email: '', phone_number: ''
  }

  paymentData: AsyncPaymentOptions = {
    public_key: this.publicKey,
    tx_ref: `Subscribe`,
    amount: 10,
    currency: "GBP",
    payment_options: "card,ussd",
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
  };
  userIp: any = null;
  faileduserIp: boolean = false;
  @Output('completed') completed:EventEmitter<any> = new EventEmitter();
  constructor(
    private deviceService:DeviceService,
    private flutterwave: Flutterwave,
    private ss: ScriptsService) {
  }

  ngOnInit(): void {
    this.id = `modal-lg-${this.ss.hashFnv32a(`${Date.now()}`,true, this.exchange)}`;
  }
  getpayment(){
    return Number(parseFloat(`${(this.ztcamount * this.exchanges[this.exchanges.selected])}`).toFixed(5));
  }

  async makePayment() {
    this.deviceService.showSpinner();
    
  }
}
