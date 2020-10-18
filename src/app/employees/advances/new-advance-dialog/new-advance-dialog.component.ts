import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormValidationService} from "../../../services/form-validation.service";
import {AuthService} from "../../../services/auth.service";
import {StaticDataService} from "../../../services/static-data.service";
import {AdvancesService} from "../advances.service";

@Component({
  selector: 'app-new-advance-dialog',
  templateUrl: './new-advance-dialog.component.html',
  styleUrls: ['./new-advance-dialog.component.styl']
})
export class NewAdvanceDialogComponent implements OnInit {

  form: FormGroup;
  types: any[];
  days: any[];

  constructor(
    public dialogRef: MatDialogRef<NewAdvanceDialogComponent>,
    public formBuilder: FormBuilder,
    private advancesService: AdvancesService,
    private authService: AuthService,
    private staticDataService: StaticDataService,
    public formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.types = this.staticDataService.dayTypes;
    this.days = this.staticDataService.days;
    this.form = this.formBuilder.group({
      employeeId: [this.data && this.data.id, this.formValidationService.required.validator],
      forDate: [null, this.formValidationService.required.validator],
      notes: null,
      amount: [null, this.formValidationService.required.validator],
    });
  }

  submit(formData) {
    formData.forDate = this.data.targetYearMonth + '-' + formData.forDate
    this.advancesService.store(formData).subscribe((res) => {
      this.dialogRef.close(true)
    }, (err) => {
    })

  }


}
