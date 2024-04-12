import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private ds: DeviceService, private scriptService: ScriptsService) { }

  ngOnInit(): void {
  }

  showAddToCart(){
    this.ds.oSuccessNotification('Added to cart', 'You have successfully added this item to cart');
  }

  navigateTo(url:string){
    this.scriptService.changePage(url);
  }
}
