import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { IngredentService } from 'src/app/shared/services/ingredent/ingredent.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  orders: Observable<any[]> = this.orderService.orders$;
  shuffles: any[] = [];
  searchResult: any = null;
  key: any = '';
  currentPage: any = 1;
  constructor(private ds: DeviceService, private scriptService: ScriptsService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.ds.showSpinner();
    this.orderService.fetch$.subscribe(
      (data: any) => { this.shuffles = data; },
      () => { },
      () => this.ds.hideSpinner()
    );
  }
  changePage(){
    this.scriptService.changePage('/admin/ingredent/create')
  }
  export(){
    this.ds.showSpinner();
    const headers = [
      'delivery',
          'email',
          'phone',
          'description',
          'total',
          'image',
          'status',
          'user_agent',
          'browserVersion',
          'os',
          'osVersion',
          'browser',
          'deviceOrientation',
          'id',
          'created_at',
          'updated_at',
          'cart'
    ]
    const data = this.shuffles.map(
      m=>{
        return {
          delivery: m.delivery.type + " :to: " + m.delivery.address,
          email:m.email,
          phone:m.phone,
          description:m.description,
          total:m.total,
          image:m.image,
          status:m.status,
          user_agent:m.user_agent,
          browserVersion:m.browserVersion,
          os:m.os,
          osVersion:m.osVersion,
          browser:m.browser,
          deviceOrientation:m.deviceOrientation,
          id:m.id,
          created_at:m.created_at,
          updated_at:m.updated_at,
          cart:m.cart.map(
            c=>{
              return `Meal ID: ${c.id} - Meal Name: ${c.name} - Quantity: ${c.quantity}\n`
            }
          ).join(),
        }
      }
    )
    this.scriptService.exportToCsv(data, headers);
    this.ds.hideSpinner();
  }

}
