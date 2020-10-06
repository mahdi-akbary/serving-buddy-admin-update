import {NgModule} from '@angular/core';
import {ExpensesRoutingModule} from './expenses-routing.module';
import {ExpensesComponent} from './expenses.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    SharedModule,
    ExpensesRoutingModule
  ]
})
export class ExpensesModule {
}
