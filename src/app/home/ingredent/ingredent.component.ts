import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'app-ingredent',
  templateUrl: './ingredent.component.html',
  styleUrls: ['./ingredent.component.scss']
})
export class IngredentComponent implements OnInit {

  constructor(private scriptService: ScriptsService) { }

  ngOnInit(): void {
  }

  changePage(){
    this.scriptService.changePage('resturant')
  }

}
