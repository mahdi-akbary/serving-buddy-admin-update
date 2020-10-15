import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
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
    this.payrollService.View({employeeId: this.data.employee_id, month: this.data.month, year: this.data.year})
      .subscribe(res => {
      this.initForm(res.data);
    });
    this.types = this.staticDataService.dayTypes;
    this.days = this.staticDataService.days;
  }

  initForm(data?: any) {
    this.form = this.formBuilder.group({
      // employeeId: [this.data && this.data.id, this.formValidationService.required.validator],
      // forDate: [null, this.formValidationService.required.validator],
      // amount: [null, this.formValidationService.required.validator],
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
      remaining: [data && this.data.remaining, this.formValidationService.required.validator],
      notes: null,
    });
  }

  submit(formData) {
    formData.forDate = this.data.targetYearMonth + '-' + formData.forDate
    this.payrollService.store(formData).subscribe((res) => {
      this.dialogRef.close(true)
    }, (err) => {
    })

  }


}
