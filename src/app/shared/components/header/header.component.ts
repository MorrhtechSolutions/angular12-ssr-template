import { Component, OnInit } from '@angular/core';
import { ScriptsService } from '../../services/client/scripts.service';

@Component({
  selector: 'app-header',
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
  navigateToHome(){
    this.scriptSevice.changePage('/');
  }

}
