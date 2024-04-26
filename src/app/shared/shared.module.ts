import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from './material.module';
import { PageLoaderComponent, CalendarComponent } from './components/Index';
import { FlutterwaveModule } from "flutterwave-angular-v3"
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {NgxPaginationModule} from 'ngx-pagination';
import { ArraySortPipe } from './pipes/array-sort.pipe';
import { SearchSortPipe } from './pipes/search-sort.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {WebcamModule} from 'ngx-webcam';
import { SheduleMomentPipe } from './pipes/shedule-moment.pipe';
import { CustomTimerPipe } from './pipes/custom-timer.pipe';
import { ScrollingTextComponent } from './components/scrolling-text/scrolling-text.component';
import { NotifyComponent } from './components/notify/notify.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { TextareaComponent } from './components/textarea/textarea.component';
// Import library module
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { FundWalletComponent } from './components/fund-wallet/fund-wallet.component';
import {RouterModule} from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { DeliveryComponent } from './components/delivery/delivery.component';


@NgModule({
  declarations: [
    PageLoaderComponent,
    CalendarComponent,
    NotFoundComponent,
    ArraySortPipe,
    SearchSortPipe,
    ModalComponent,
    SheduleMomentPipe,
    CustomTimerPipe,
    ScrollingTextComponent,
    NotifyComponent,
    ChatboxComponent,
    TextareaComponent,
    FundWalletComponent,
    PaymentComponent,
    FooterComponent,
    HeaderComponent,
    CartComponent,
    CheckoutComponent,
    AddToCartComponent,
    DeliveryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    FlutterwaveModule,
    HttpClientModule,
    AngularEditorModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    WebcamModule,
    IvyCarouselModule,
    NgxAudioPlayerModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    PageLoaderComponent,
    CalendarComponent,
    HttpClientModule,
    FlutterwaveModule,
    NotFoundComponent,
    AngularEditorModule,
    NgxPaginationModule,
    ArraySortPipe,
    SearchSortPipe,
    ModalComponent,
    NgxSpinnerModule,
    WebcamModule,
    SheduleMomentPipe,
    CustomTimerPipe,
    ScrollingTextComponent,
    NotifyComponent,
    IvyCarouselModule,
    TextareaComponent,
    HeaderComponent,
    FooterComponent,
    NgxAudioPlayerModule,
    FundWalletComponent,
    PaymentComponent,
    ChatboxComponent,
    AddToCartComponent,
    DeliveryComponent
  ],
  entryComponents: [ModalComponent]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        MaterialExampleModule,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    };
 }
 }
