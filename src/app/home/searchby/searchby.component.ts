import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'app-searchby',
  templateUrl: './searchby.component.html',
  styleUrls: ['./searchby.component.scss']
})
export class SearchbyComponent implements OnInit {

  constructor(private scriptService:ScriptsService) { }

  ngOnInit(): void {
  }

  changePage(){
    this.scriptService.changePage('resturant')
  }
}
