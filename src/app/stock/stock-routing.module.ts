import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StockComponent} from './stock.component';
import {ManualUsageComponent} from './manual-usage/manual-usage.component';
import {AddCorrectionLogComponent} from './add-correction-log/add-correction-log.component';
import {UsageLogComponent} from './usage-log/usage-log.component';

const routes: Routes = [
  {
    path: '',
    component: StockComponent,
  }, {
    path: 'manual-usage',
    component: ManualUsageComponent
  }, {
    path: 'add-correction-log',
    component: AddCorrectionLogComponent
  }, {
    path: 'usage-log',
    component: UsageLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule {
}
