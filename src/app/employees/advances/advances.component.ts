import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {StaticDataService} from "../../services/static-data.service";
import {MatDialog} from "@angular/material/dialog";
import {FormValidationService} from "../../services/form-validation.service";
import {AdvancesService} from "./advances.service";
import {ListAdvanceDialogComponent} from "./list-advance-dialog/list-advance-dialog.component";
import {NewAdvanceDialogComponent} from "./new-advance-dialog/new-advance-dialog.component";

@Component({
  selector: 'app-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.styl']
})
export class AdvancesComponent implements OnInit {

  isExpanded: boolean = true;
  years: any[] = [];
  months: any[] = [];
  form: FormGroup;
  searchResultList: any[] = [];
  isSearched: boolean = false;
  panel: any;

  constructor(private advancesService: AdvancesService,
              public formBuilder: FormBuilder,
              private staticDataService: StaticDataService,
              public dialog: MatDialog,
              public formValidationService: FormValidationService,) {
  }

  ngOnInit(): void {
    this.months = this.staticDataService.months;
    this.years = this.advancesService.generateSelectYears();
    this.form = this.formBuilder.group({
      year: [null, this.formValidationService.required.validator],
      month: [null, this.formValidationService.required.validator],
    } as any);
  }

  submit(formData: {}, panel) {
    this.panel = panel;
    panel.close();
    this.advancesService.index(formData).subscribe(res => {
      this.searchResultList = res.data;
      this.searchResultList.forEach(item => item.targetYearMonth = this.form.value.year + '-' + this.form.value.month);
      this.isSearched = true;

    })
  }

  list(data) {
    const dialogRef = this.dialog.open(ListAdvanceDialogComponent, {
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
    const dialogRef = this.dialog.open(NewAdvanceDialogComponent, {
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
