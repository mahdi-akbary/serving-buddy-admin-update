import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormValidationService} from "../../../services/form-validation.service";
import {AuthService} from "../../../services/auth.service";
import {StaticDataService} from "../../../services/static-data.service";
import {PayrollService} from "../payroll.service";

@Component({
  selector: 'app-new-payroll-dialog',
  templateUrl: './new-payroll-dialog.component.html',
  styleUrls: ['./new-payroll-dialog.component.styl']
})
export class NewPayrollDialogComponent implements OnInit {

  form: FormGroup;
  types: any[];
  days: any[];

  constructor(
    public dialogRef: MatDialogRef<NewPayrollDialogComponent>,
    public formBuilder: FormBuilder,
    private payrollService: PayrollService,
    private authService: AuthService,
    private staticDataService: StaticDataService,
    public formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    const temp: any = {
      employeeId: this.data.employee_id,
      month: this.data.month,
      year: this.data.year,
    }
    if (this.data && this.data.id) {
      temp.isExecuted = true;
    }
    this.payrollService.View(temp)
      .subscribe(res => {
        const temp = res.data;
        temp.base_salary_daily = (temp.base_salary_monthly / temp.month_days_count).toFixed(2);
        if (!(temp && temp.id)) {
          temp.total_for_absenties = (temp.total_for_absenties * temp.base_salary_daily).toFixed(2);
          temp.payable_salary = this.getPayableSalary(temp);
        }
        this.initForm(res.data);
      });
    this.types = this.staticDataService.dayTypes;
    this.days = this.staticDataService.days;
  }

  getPayableSalary(temp): number {
    return Math.round((+temp.base_salary_monthly) -
      (+temp.total_for_absenties) -
      (+temp.total_advances) -
      (+temp.old_calculations) +
      (isNaN(+temp.adjustments) ? 0 : (+temp.adjustments)));
  }

  initForm(data?: any) {
    this.form = this.formBuilder.group({
      employee_name: [data && data.employee_name, this.formValidationService.required.validator],
      employee_id: [data && data.employee_id, this.formValidationService.required.validator],
      employee_father_name: [data && data.employee_father_name, this.formValidationService.required.validator],
      employee_designation: [data && data.employee_designation, this.formValidationService.required.validator],
      target_year_month: [data && data.target_year_month, this.formValidationService.required.validator],
      base_salary_monthly: [data && data.base_salary_monthly, this.formValidationService.required.validator],
      month_days_count: [data && data.month_days_count, this.formValidationService.required.validator],
      base_salary_daily: [data && data.base_salary_daily, this.formValidationService.required.validator],
      total_for_absenties: [data && data.total_for_absenties, this.formValidationService.required.validator],
      total_advances: [data && data.total_advances, this.formValidationService.required.validator],
      old_calculations: [data && data.old_calculations, this.formValidationService.required.validator],
      adjustments: [data && data.adjustments, this.formValidationService.required.validator],
      payable_salary: [data && data.payable_salary, this.formValidationService.required.validator],
      paid: [data && data.paid, this.formValidationService.required.validator],
      remaining: [(data && data.remaining) ? data.remaining : this.getRemaining(data), this.formValidationService.required.validator],
      notes: data && data.notes,
    });
    if (this.data && this.data.id) {
      this.form.addControl('execution_datetime', new FormControl((new Date(data.execution_datetime)).toLocaleString()));
      this.form.addControl('executed_by_name', new FormControl(data.executed_by_name));
    }
    this.form.get('adjustments').valueChanges.subscribe(value => {
      if (value) {
        this.form.get('payable_salary').setValue(this.getPayableSalary({...this.form.value, adjustments: value}));
        this.form.get('remaining').setValue(this.getRemaining({...this.form.value, adjustments: value}));
      }
    })
    this.form.get('paid').valueChanges.subscribe(value => {
      if (value) {
        this.form.get('remaining').setValue(this.getRemaining({...this.form.value, paid: value}));
      }
    })

  }

  getRemaining(temp): number {
    return temp.remaining = -(
      (+temp.payable_salary) -
      (isNaN(+temp.paid) ? 0 : (+temp.paid))
    );
  }

  submit(formData) {
    const temp = this.prepareData(formData);
    this.payrollService.store(formData).subscribe((res) => {
      this.dialogRef.close(true)
    }, (err) => {
    })

  }

  prepareData(formData) {
    formData.baseSalaryDaily = formData.base_salary_daily;
    delete (formData.base_salary_daily)
    formData.baseSalaryMonthly = formData.base_salary_monthly;
    delete (formData.base_salary_monthly)
    formData.targetYearMonth = formData.target_year_month;
    delete (formData.target_year_month)
    formData.monthDaysCount = formData.month_days_count;
    delete (formData.month_days_count)
    formData.oldCalculations = formData.old_calculations;
    delete (formData.old_calculations)
    formData.payableSalary = formData.payable_salary;
    delete (formData.payable_salary)
    formData.totalForAbsenties = formData.total_for_absenties;
    delete (formData.total_for_absenties)
    formData.totalAdvances = formData.total_advances;
    delete (formData.total_advances)
    formData.employee = {
      id: formData.employee_id,
      name: formData.employee_name,
      fatherName: formData.employee_father_name,
      designation: formData.employee_designation
    }
    delete formData.employee_id;
    delete formData.employee_name
    delete formData.employee_father_name
    delete formData.employee_designation

    formData.executed = {
      by: {id: this.authService.user.id, name: this.authService.user.name},
      datetime: new Date()
    };
    return formData
  }
}
