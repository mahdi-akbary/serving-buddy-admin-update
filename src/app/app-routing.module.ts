import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "en",
    pathMatch: "full",
  },
  {
    path: "en",
    children: [
      {
        path: "",
        redirectTo: "orders-bills",
        pathMatch: 'full'
      },
      {
        path: "orders-bills",
        loadChildren: () => import('./orders-bills/orders-bills.module').then(m => m.OrdersBillsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
