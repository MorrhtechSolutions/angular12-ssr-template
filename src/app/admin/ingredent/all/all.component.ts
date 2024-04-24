import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { IngredentService } from 'src/app/shared/services/ingredent/ingredent.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  ingredents: Observable<any[]> = this.ingredentService.ingredents$;
  shuffles: any[] = [];
  searchResult: any = null;
  key: any = '';
  currentPage: any = 1;
  constructor(private ds: DeviceService, private scriptService: ScriptsService, private ingredentService: IngredentService) { }

  ngOnInit(): void {
    this.ds.showSpinner();
    this.ingredentService.fetch$.subscribe(
      (data: any) => { this.shuffles = data; },
      () => { },
      () => this.ds.hideSpinner()
    );
  }
  changePage(){
    this.scriptService.changePage('/admin/ingredent/create')
  }

}
