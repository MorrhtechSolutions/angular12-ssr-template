import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SockResolver } from './shared/resolvers/socket/sock.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./home/home.module').then(m => m.HomeModule),
    resolve:{
      fromSock: SockResolver
    }
  },
  {
    path: 'resturant',
    loadChildren: ()=> import('./resturant/resturant.module').then(m => m.ResturantModule),
    resolve:{
      fromSock: SockResolver
    }
  },
  {
    path: 'order',
    loadChildren: ()=> import('./order/order.module').then(m => m.OrderModule),
    resolve:{
      fromSock: SockResolver
    }
  },
  {
    path: 'support',
    loadChildren: ()=> import('./support/support.module').then(m => m.SupportModule),
    resolve:{
      fromSock: SockResolver
    }
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule),
    resolve:{
      fromSock: SockResolver
    }
  },
  {
    path: 'admin',
    loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule),
    resolve:{
      fromSock: SockResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
