import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CookieComponent } from './cookie/cookie.component';
import { FAQComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { PartnerwithusComponent } from './partnerwithus/partnerwithus.component';
import { RidewithusComponent } from './ridewithus/ridewithus.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'cookie',
    component: CookieComponent
  },
  {
    path: 'faq',
    component: FAQComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'partnerwithus',
    component: PartnerwithusComponent
  },
  {
    path: 'ridewithus',
    component: RidewithusComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
