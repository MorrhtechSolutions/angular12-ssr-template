import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private scriptService: ScriptsService) { }

  ngOnInit(): void {
  }

  changePage(){
    this.scriptService.changePage('');
  }

}
