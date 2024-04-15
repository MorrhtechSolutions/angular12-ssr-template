import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'order',
        loadChildren: ()=> import('./order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'meal',
        loadChildren: ()=> import('./meal/meal.module').then(m => m.MealModule)
      },
      {
        path: 'ingredent',
        loadChildren: ()=> import('./ingredent/ingredent.module').then(m => m.IngredentModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
