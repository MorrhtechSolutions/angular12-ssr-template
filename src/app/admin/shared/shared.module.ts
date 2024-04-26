import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports: [
    HeaderComponent,
    NgxPaginationModule
  ]
})
export class SharedModule { }
