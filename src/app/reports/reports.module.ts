import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportsRoutingModule} from './reports-routing.module';
import {PaymentsLogComponent} from './payments-log/payments-log.component';
import {DailySummaryReportComponent} from './daily-summary-report/daily-summary-report.component';
import {ItemsSummaryReportComponent} from './items-summary-report/items-summary-report.component';
import {CategoriesSummaryReportComponent} from './categories-summary-report/categories-summary-report.component';
import {DebtsComponent} from './debts/debts.component';
import {CategoriesSummaryReportService} from './categories-summary-report/categories-summary-report.service';
import {DailySummaryReportService} from './daily-summary-report/daily-summary-report.service';
import {DebtsService} from './debts/debts.service';
import {ItemsSummaryReportService} from './items-summary-report/items-summary-report.service';
import {PaymentsLogService} from './payments-log/payments-log.service';


@NgModule({
  declarations: [
    PaymentsLogComponent,
    DailySummaryReportComponent,
    ItemsSummaryReportComponent,
    CategoriesSummaryReportComponent,
    DebtsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ],
  providers: [
    CategoriesSummaryReportService,
    DailySummaryReportService,
    DebtsService,
    ItemsSummaryReportService,
    PaymentsLogService
  ]
})
export class ReportsModule {
}
