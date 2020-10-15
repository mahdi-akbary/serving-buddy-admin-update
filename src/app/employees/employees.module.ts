import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeesRoutingModule} from './employees-routing.module';
import {EmployeesComponent} from './employees.component';
import {LeavesAndAbsentiesComponent} from './leaves-and-absenties/leaves-and-absenties.component';
import {AdvancesComponent} from './advances/advances.component';
import {PayrollComponent} from './payroll/payroll.component';
import {EmployeesService} from './employees.service';
import {AdvancesService} from './advances/advances.service';
import {LeavesAndAbsentiesService} from './leaves-and-absenties/leaves-and-absenties.service';
import {PayrollService} from './payroll/payroll.service';
import {SharedModule} from '../shared/shared.module';
import {AddEditEmployeeDialogComponent} from "./add-edit-employee-dialog/add-edit-employee-dialog.component";
import {NewLeaveAbsentDialogComponent} from "./leaves-and-absenties/new-leave-absent-dialog/new-leave-absent-dialog.component";
import {ListLeaveAbsentDialogComponent} from "./leaves-and-absenties/list-leave-absent-dialog/list-leave-absent-dialog.component";

@NgModule({
  declarations: [
    EmployeesComponent,
    LeavesAndAbsentiesComponent,
    AdvancesComponent,
    PayrollComponent,
    AddEditEmployeeDialogComponent,
    NewLeaveAbsentDialogComponent,
    ListLeaveAbsentDialogComponent
  ],
  imports: [
    SharedModule,
    EmployeesRoutingModule
  ],
  providers: [
    EmployeesService,
    AdvancesService,
    LeavesAndAbsentiesService,
    PayrollService
  ]
})
export class EmployeesModule {
}
