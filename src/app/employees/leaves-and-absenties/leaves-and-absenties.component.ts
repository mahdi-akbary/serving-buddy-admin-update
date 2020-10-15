import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {FormValidationService} from "../../services/form-validation.service";
import {StaticDataService} from "../../services/static-data.service";
import {LeavesAndAbsentiesService} from "./leaves-and-absenties.service";
import {NewLeaveAbsentDialogComponent} from "./new-leave-absent-dialog/new-leave-absent-dialog.component";
import {ListLeaveAbsentDialogComponent} from "./list-leave-absent-dialog/list-leave-absent-dialog.component";

@Component({
  selector: 'app-leaves-and-absenties',
  templateUrl: './leaves-and-absenties.component.html',
  styleUrls: ['./leaves-and-absenties.component.styl']
})
export class LeavesAndAbsentiesComponent implements OnInit {

  isExpanded: boolean = true;
  years: any[] = [];
  months: any[] = [];
  form: FormGroup;
  searchResultList: any[] = [];
  isSearched: boolean = false;
  panel: any;

  constructor(private leavesAndAbsentiesService: LeavesAndAbsentiesService,
              public formBuilder: FormBuilder,
              private staticDataService: StaticDataService,
              public dialog: MatDialog,
              public formValidationService: FormValidationService,) {
  }

  ngOnInit(): void {
    this.months = this.staticDataService.months;
    this.years = this.leavesAndAbsentiesService.generateSelectYears();
    this.form = this.formBuilder.group({
      year: [null, this.formValidationService.required.validator],
      month: [null, this.formValidationService.required.validator],
    } as any);
  }

  submit(formData: {}, panel) {
    this.panel = panel;
    panel.close();
    this.leavesAndAbsentiesService.index(formData).subscribe(res => {
      this.searchResultList = res.data;
      this.searchResultList.forEach(item => item.targetYearMonth = this.form.value.year + '-' + this.form.value.month);
      this.isSearched = true;

    })
  }

  list(data) {
    const dialogRef = this.dialog.open(ListLeaveAbsentDialogComponent, {
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

  add(data) {
    const dialogRef = this.dialog.open(NewLeaveAbsentDialogComponent, {
      width: '400px',
      data: data,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submit(this.form.value, this.panel)
      }
    });
  }

}
