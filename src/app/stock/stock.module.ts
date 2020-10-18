import {NgModule} from '@angular/core';
import {StockRoutingModule} from './stock-routing.module';
import {StockComponent} from './stock.component';
import {AddCorrectionLogComponent} from './add-correction-log/add-correction-log.component';
import {ManualUsageComponent} from './manual-usage/manual-usage.component';
import {UsageLogComponent} from './usage-log/usage-log.component';
import {StockService} from './stock.service';
import {AddCorrectionLogService} from './add-correction-log/add-correction-log.service';
import {ManualUsageService} from './manual-usage/manual-usage.service';
import {UsageLogService} from './usage-log/usage-log.service';
import {SharedModule} from '../shared/shared.module';
import {AddCorrectDialogComponent} from './add-correct-dialog/add-correct-dialog.component';
import {AddEditDialogComponent} from './manual-usage/add-edit-dialog/add-edit-dialog.component';

@NgModule({
  declarations: [
    StockComponent,
    AddCorrectionLogComponent,
    ManualUsageComponent,
    UsageLogComponent,
    AddCorrectDialogComponent,
    AddEditDialogComponent
  ],
  imports: [
    SharedModule,
    StockRoutingModule
  ],
  providers: [
    StockService,
    AddCorrectionLogService,
    ManualUsageService,
    UsageLogService
  ]
})
export class StockModule {
}
