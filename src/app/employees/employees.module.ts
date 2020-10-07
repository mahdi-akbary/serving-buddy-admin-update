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

@NgModule({
  declarations: [
    EmployeesComponent,
    LeavesAndAbsentiesComponent,
    AdvancesComponent,
    PayrollComponent
  ],
  imports: [
    CommonModule,
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
