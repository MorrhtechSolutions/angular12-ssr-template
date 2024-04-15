import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';

@Component({
  selector: 'app-partnerwithus',
  templateUrl: './partnerwithus.component.html',
  styleUrls: ['./partnerwithus.component.scss']
})
export class PartnerwithusComponent implements OnInit {


  constructor(private scriptService: ScriptsService) { }

  ngOnInit(): void {
  }

  changePage(){
    this.scriptService.changePage('');
  }

}

