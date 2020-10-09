import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesComponent} from './employees.component';
import {LeavesAndAbsentiesComponent} from './leaves-and-absenties/leaves-and-absenties.component';
import {AdvancesComponent} from './advances/advances.component';
import {PayrollComponent} from './payroll/payroll.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  }, {
    path: 'leaves-and-absenties',
    component: LeavesAndAbsentiesComponent
  }, {
    path: 'advances',
    component: AdvancesComponent
  }, {
    path: 'payroll',
    component: PayrollComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {
}
