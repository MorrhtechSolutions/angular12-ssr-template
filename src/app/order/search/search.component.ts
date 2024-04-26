import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input('key') key: any = '';
  @Output('clicked') clicked: EventEmitter<any> = new EventEmitter();
  @Output('keyChanged') keyChanged: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private ds: DeviceService, private scriptService: ScriptsService, private orderService: OrderService) { }

  ngOnInit(): void {
  }
  onNgModelChange($event) {
    // this.keyChanged.emit(this.key);
  }
  search() {
    if (this.key.length > 0) {
      this.keyChanged.emit(this.key);
      this.ds.showSpinner();
      this.orderService.read(this.key).subscribe(
        result => this.clicked.emit(result),
        error => {
          console.log(error);
          this.ds.oErrorNotification('Opss', 'Something went wrong. Try again or contact the support')
        },
        () => this.ds.hideSpinner()
      )
    } else {
      this.ds.oInfoNotification('Required', 'Order ID is required');
      this.keyChanged.emit('');
      this.clicked.emit(undefined);
    }

    // this.router.navigate(['/order/view/'+'05'], { queryParams: { term: searchTerm } });
  }

}



