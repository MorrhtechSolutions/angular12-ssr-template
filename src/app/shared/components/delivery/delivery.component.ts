import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScriptsService } from '../../services/client/scripts.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  @Input('type') type: 'page' | 'modal'='page'
  state: 0 | 1 = 0;
  @Output('clicked') clicked: EventEmitter<any> = new EventEmitter();
  address:string = '';
  randomid:any = `${this.scriptService.generateRandomAlphanumeric(5)}`;
  constructor(private scriptService: ScriptsService) { }

  ngOnInit(): void {
  }
  submit(){
    if(this.type == 'page'){
      this.scriptService.changePage('resturant');
    }else{
      const type = this.state == 0 ? 'delivery' : 'Pickup';
      console.log({type, address:this.address})
      this.clicked.emit({type, address:this.address});
    }
  }
  change(state:any){

  }

}
