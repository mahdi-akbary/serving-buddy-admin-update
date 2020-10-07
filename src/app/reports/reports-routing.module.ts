import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentsLogComponent} from './payments-log/payments-log.component';
import {DailySummaryReportComponent} from './daily-summary-report/daily-summary-report.component';
import {ItemsSummaryReportComponent} from './items-summary-report/items-summary-report.component';
import {CategoriesSummaryReportComponent} from './categories-summary-report/categories-summary-report.component';
import {DebtsComponent} from './debts/debts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'payments-log',
    pathMatch: 'full'
  }, {
    path: 'payments-log',
    component: PaymentsLogComponent,
  }, {
    path: 'daily-summary-report',
    component: DailySummaryReportComponent
  }, {
    path: 'items-summary-report',
    component: ItemsSummaryReportComponent
  }, {
    path: 'categories-summary-report',
    component: CategoriesSummaryReportComponent
  }, {
    path: 'debts',
    component: DebtsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {
}
