import { Component, OnInit } from '@angular/core';
import { ScriptsService } from '../../services/client/scripts.service';
declare const $:any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  id:string =  `CartModal${this.scriptService.generateRandomAlphanumeric(15)}`;
  constructor(private scriptService: ScriptsService) { }

  ngOnInit(): void {}
  show(){
    $(`#${this.id}`).appendTo("body").modal('show');
  }
  closemodal(){
    $(`#${this.id}`).modal('toggle');
  }
}
