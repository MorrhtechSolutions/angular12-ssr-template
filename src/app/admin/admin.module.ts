import { SharedModule as GlobalSharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    GlobalSharedModule
  ]
})
export class AdminModule { }
