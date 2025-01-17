import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    SharedModule
  ]
})
export class SupportModule { }
