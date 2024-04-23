import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredentRoutingModule } from './ingredent-routing.module';
import { CreateComponent } from './create/create.component';
import { AllComponent } from './all/all.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CreateComponent,
    AllComponent,
    DeleteComponent,
    UpdateComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    IngredentRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class IngredentModule { }
