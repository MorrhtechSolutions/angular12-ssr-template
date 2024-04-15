import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { AllComponent } from './all/all.component';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DeleteComponent,
    UpdateComponent,
    CreateComponent,
    AllComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
