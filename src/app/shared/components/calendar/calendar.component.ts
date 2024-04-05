import { Component, OnInit, Input, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AsyncPaymentOptions, Flutterwave } from 'flutterwave-angular-v3';
import { DeviceService } from '../../services/client/device.service';
declare const jQuery: any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() id: string = 'calendar';
  @Input() tagetCreate: boolean = false;
  canCreate: boolean = false;
  selectedPeriod: any = null;
  today: any = new Date();
  eventList: any = [
  ];
  reference = 'ref-27535012752945';

  publicKey = environment.flutter_public_key;
  newBooking: any = {
    postal: '',
    start: this.today,
    end: null,
    name: '',
    description: '',
    frequency: '',
    extra_service: '',
    color: 'fc-bg-default',
    icon: 'circle',
    cleaner: null,
    country: '',
    pricing: null,
    payment: null,
  }
  message = '';
  amount: number = 1;

  customizations = { title: 'Chow Cheap', description: 'Make your final payment for this order and get your item delivered ASAP!', logo: 'https://flutterwave.com/images/logo-colored.svg' }

  meta = {
    'counsumer_id': '7898',
    'consumer_mac': 'kjs9s8ss7dd'
  }
  user:any = null;

  //updated by the checkout()
  customerDetails = {
    name: 'Demo Customer  Name',
    amount: 0,
    email: 'customer@mail.com', phone_number: '08100000000'
  }
  calendar: any = (params: any) => jQuery(`#${this.id}`).fullCalendar(params);
  params: any = {
    themeSystem: "bootstrap4",
    // emphasizes business hours
    businessHours: false,
    defaultView: "month",
    // event dragging & resizing
    editable: true,
    // header
    header: {
      left: "title",
      center: "month,agendaWeek,agendaDay",
      right: "today prev,next",
    },
    events: this.eventList,
    dayClick: (e: any) => {
      this.clickedOnDay(e);
      jQuery("#modal-view-event-add").modal();
    },
    eventClick: (event: any, jsEvent: any, view: any) => {

      jQuery(".event-icon").html("<i class='fa fa-" + event.icon + "'></i>");
      jQuery(".event-title").html(event.title);
      jQuery(".event-postal").html(event.postal);
      jQuery(".event-country").html(event.country);
      jQuery(".event-frequency").html(event.frequency);
      jQuery(".event-start").html(event.start);
      jQuery(".event-end").html(event.end);
      jQuery(".event-cleaner").html(event.cleaner);
      jQuery(".event-extra_service").html(event.extra_service);
      jQuery(".event-body").html(event.description);
      jQuery(".eventUrl").attr("href", event.url);
      jQuery("#modal-view-event").modal();
    },
  }

  paymentData: AsyncPaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: "GBP, USD, NGN, CAD",
    payment_options: "card,ussd",
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
  };

  constructor(
    private _ds: DeviceService,
    private flutterwave: Flutterwave, private crf: ChangeDetectorRef) {
      this.today.setDate(this.today.getDate() - 1);
      this.today = this.today.toISOString().slice(0, 16);
     }
  ngOnDestroy(): void {

  }

  async payViaPromise() {
    return this.flutterwave.asyncInlinePay(this.paymentData);
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

  setAmount(event: any) {


  }


  ngAfterViewInit(): void {


  }
  ngOnInit(): void {

    
  }

  clickedOnDay(event: any) {
    const rn = new Date(this.today);
    const selected = new Date(event._d);
    this.selectedPeriod = selected;
    this.newBooking.start = this.selectedPeriod;



    if (rn.getTime() < selected.getTime()) {
      this.canCreate = true;
    } else {
      this.canCreate = false;
    }
    if(this.tagetCreate){
      this.canCreate = true;
    }

  }

  async submit() {
    let message = '';
    this.message = '';


  }
}
