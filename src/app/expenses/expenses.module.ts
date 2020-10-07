import {NgModule} from '@angular/core';
import {ExpensesRoutingModule} from './expenses-routing.module';
import {ExpensesComponent} from './expenses.component';
import {SharedModule} from '../shared/shared.module';
import {AddEditDialogComponent} from './add-edit-dialog/add-edit-dialog.component';
import {ExpensesService} from './expenses.service';

@NgModule({
  declarations: [
    ExpensesComponent,
    AddEditDialogComponent
  ],
  imports: [
    SharedModule,
    ExpensesRoutingModule
  ],
  providers: [
    ExpensesService
  ]
})
export class ExpensesModule {
}
