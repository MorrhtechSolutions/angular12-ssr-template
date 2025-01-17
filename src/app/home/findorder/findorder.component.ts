import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'app-findorder',
  templateUrl: './findorder.component.html',
  styleUrls: ['./findorder.component.scss']
})
export class FindorderComponent implements OnInit {

  constructor(private scriptService:ScriptsService) { }

  ngOnInit(): void {
  }
  navigateToOrder(){
    this.scriptService.changePage('order');
  }
}
