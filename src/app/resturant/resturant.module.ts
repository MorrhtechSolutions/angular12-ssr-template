import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResturantRoutingModule } from './resturant-routing.module';
import { IndexComponent } from './index/index.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    IndexComponent,
    ListComponent,
    CreateComponent,
    ViewComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ResturantRoutingModule,
    SharedModule
  ]
})
export class ResturantModule { }
