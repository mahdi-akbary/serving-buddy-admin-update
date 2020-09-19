import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "en",
    pathMatch: "full",
  },
  {
    path: ":lang",
    children: [
      {
        path: "",
        redirectTo: "orders-bills",
        pathMatch: 'full'
      },
      {
        path: "orders-bills",
        loadChildren: () => import('./orders-bills/orders-bills.module').then(m => m.OrdersBillsModule),
      },
      {
        path: "providers",
        loadChildren: () => import('./providers/providers.module').then(m => m.ProvidersModule),
      },
      {
        path: "expenses",
        loadChildren: () => import('./expenses/expenses.module.js').then(m => m.ExpensesModule),
      },
      {
        path: "stock",
        loadChildren: () => import('./stock/stock.module').then(m => m.StockModule),
      },
      {
        path: "employees",
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
      },
      {
        path: "reports",
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: "settings",
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: "notifications",
        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'en')
    }
  }
}
