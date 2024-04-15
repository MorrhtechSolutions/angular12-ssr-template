import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealRoutingModule } from './meal-routing.module';
import { AllComponent } from './all/all.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AllComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    MealRoutingModule,
    SharedModule
  ]
})
export class MealModule { }
