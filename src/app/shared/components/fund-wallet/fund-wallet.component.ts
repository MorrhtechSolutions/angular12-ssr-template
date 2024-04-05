import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ScriptsService } from '../../services/client/scripts.service';
import { Observable,of } from 'rxjs';
import { DeviceService } from '../../services/client/device.service';
import { Router } from '@angular/router';
declare const $:any;
@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.scss']
})
export class FundWalletComponent implements OnInit {
  id:string = `Fund-Component-${this.scriptService.generateRandomAlphanumeric(7)}`;
  rates:any = {
    dollar: 0.85,
    naira: 980,
    btc: 35960,
    eth: 1390
  }
  currencyToPay:number = 1;
  amount:number = 1;
  timestamp:number = Date.now();
  methodofPayment:string = 'Flutterwave';
  fundingwallet:string = '';
  listOfWallet:Observable<any[]>=of([]);
  @Output('redirecting') redirecting:EventEmitter<any> = new EventEmitter()
  constructor(private scriptService:ScriptsService,
    private ds:DeviceService,
    private router: Router) { }

  ngOnInit(): void {
  }
  goTo(url:string){
    this.scriptService.changePage(url);
  }
  get url(){
    return `accounting/transaction/generate/${this.fundingwallet}/${this.amountToPay}/${this.methodofPayment}/${this.currencyToPay}`;
  }
  get amountToPay(){
    if(this.currencyToPay <1200){
      return this.amount * this.currencyToPay
    }else{
      return this.amount /this.currencyToPay
    }
  }
  redirect(){
    $(`#${this.id}`).modal('toggle');
    this.redirecting.emit(this.url)
  }
}
