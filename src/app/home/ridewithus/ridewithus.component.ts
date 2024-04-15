import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'app-ridewithus',
  templateUrl: './ridewithus.component.html',
  styleUrls: ['./ridewithus.component.scss']
})
export class RidewithusComponent implements OnInit {

  constructor(private scriptService: ScriptsService) { }

  ngOnInit(): void {
  }

  changePage(){
    this.scriptService.changePage('');
  }

}


