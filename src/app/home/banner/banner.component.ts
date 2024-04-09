import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(private scriptService:ScriptsService) { }

  ngOnInit(): void {
  }
  submit(){
    this.scriptService.changePage('resturant');
  }

}
