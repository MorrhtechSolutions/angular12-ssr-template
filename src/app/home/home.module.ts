import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { BannerComponent } from './banner/banner.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { IngredentComponent } from './ingredent/ingredent.component';
import { MealComponent } from './meal/meal.component';
import { OurshopsComponent } from './ourshops/ourshops.component';
import { FindorderComponent } from './findorder/findorder.component';
import { PopularComponent } from './popular/popular.component';
import { DowloadappComponent } from './dowloadapp/dowloadapp.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RidewithusComponent } from './ridewithus/ridewithus.component';
import { PartnerwithusComponent } from './partnerwithus/partnerwithus.component';
import { FAQComponent } from './faq/faq.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookieComponent } from './cookie/cookie.component';
import { SearchbyComponent } from './searchby/searchby.component';


@NgModule({
  declarations: [
    IndexComponent,
    BannerComponent,
    HowItWorksComponent,
    IngredentComponent,
    MealComponent,
    OurshopsComponent,
    FindorderComponent,
    PopularComponent,
    DowloadappComponent,
    AboutusComponent,
    RidewithusComponent,
    PartnerwithusComponent,
    FAQComponent,
    TermsComponent,
    PrivacyComponent,
    CookieComponent,
    SearchbyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }

