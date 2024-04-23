import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { IngredentService } from 'src/app/shared/services/ingredent/ingredent.service';

@Component({
  selector: 'app-ingredent',
  templateUrl: './ingredent.component.html',
  styleUrls: ['./ingredent.component.scss']
})
export class IngredentComponent implements OnInit {

  ingredents: Observable<any[]> = this.ingredentService.ingredents$;

  shuffles: any = {
    first: [],
    second: [],
    third: [],
    fourth: [],
  }
  constructor(private scriptService: ScriptsService,
    private ingredentService: IngredentService,
    private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceService.showSpinner();
    this.ingredentService.fetch$.subscribe(
      (data: any) => { this.shuffles.first = data.slice(0, 4); this.shuffles.second = data.slice(0, 4); this.shuffles.third = data.slice(0, 4); this.shuffles.fourth = data.slice(0, 4); },
      () => { },
      () => this.deviceService.hideSpinner()
    );
  }

  changePage() {
    this.scriptService.changePage('resturant')
  }

}
