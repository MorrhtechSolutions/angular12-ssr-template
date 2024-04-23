import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private ds: DeviceService, private scriptService: ScriptsService) { }

  ngOnInit(): void {
  }
  search() {
    const searchTerm = (document.querySelector('[name="searchTerm"]') as HTMLInputElement).value;
    this.router.navigate(['/order/view/'+'05'], { queryParams: { term: searchTerm } });
  }

}



