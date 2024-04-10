import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/shared/services/client/device.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

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
