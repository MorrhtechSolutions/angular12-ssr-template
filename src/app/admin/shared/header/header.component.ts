import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private scriptSevice: ScriptsService) { }

  ngOnInit(): void {
  }
  navigateToshop(){
    this.scriptSevice.changePage('resturant');
  }
  navigateToMeal(){
    this.scriptSevice.changePage('admin/meal');
  }
  navigateToOrder(){
    this.scriptSevice.changePage('admin/order');
  }
  navigateToIng(){
    this.scriptSevice.changePage('admin/ingredent');
  }
  navigateToHome(){
    this.scriptSevice.changePage('/');
  }

}
