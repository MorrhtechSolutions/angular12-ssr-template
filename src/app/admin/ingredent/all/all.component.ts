import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  constructor(private sc: ScriptsService) { }

  ngOnInit(): void {
  }

  changePage(){
    this.sc.changePage('/admin/ingredent/create')
  }

}
