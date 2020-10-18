import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {StaticDataService} from "../../services/static-data.service";
import {MatDialog} from "@angular/material/dialog";
import {FormValidationService} from "../../services/form-validation.service";
import {PayrollService} from "./payroll.service";
import {NewPayrollDialogComponent} from "./new-payroll-dialog/new-payroll-dialog.component";

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.styl']
})
export class PayrollComponent implements OnInit {


  isExpanded: boolean = true;
  years: any[] = [];
  months: any[] = [];
  form: FormGroup;
  searchResultList: any[] = [];
  isSearched: boolean = false;
  panel: any;

  constructor(private payrollService: PayrollService,
              public formBuilder: FormBuilder,
              private staticDataService: StaticDataService,
              public dialog: MatDialog,
              public formValidationService: FormValidationService,) {
  }

  ngOnInit(): void {
    this.months = this.staticDataService.months;
    this.years = this.payrollService.generateSelectYears();
    this.form = this.formBuilder.group({
      year: [null, this.formValidationService.required.validator],
      month: [null, this.formValidationService.required.validator],
    } as any);
  }

  submit(formData: {}, panel) {
    this.panel = panel;
    panel.close();
    this.payrollService.index(formData).subscribe(res => {
      this.searchResultList = res.data;
      this.searchResultList.forEach(item => item.targetYearMonth = this.form.value.year + '-' + this.form.value.month);
      this.isSearched = true;

    })
  }


  add(data) {
    const dialogRef = this.dialog.open(NewPayrollDialogComponent, {
      width: '800px',
      data: {...data, ...this.form.value},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submit(this.form.value, this.panel)
      }
    });
  }

}
