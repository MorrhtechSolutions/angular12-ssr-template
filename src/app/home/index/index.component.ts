import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private scriptSevice: ScriptsService) { }

  ngOnInit(): void {
  }
  navigateToOrder(){
    this.scriptSevice.changePage('order');
  }

}
