import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormValidationService} from '../../../services/form-validation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ManualUsageService} from '../manual-usage.service';
import {IManualUsageListItem} from '../../stock.types';
import {StaticDataService} from '../../../services/static-data.service';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.styl']
})
export class AddEditDialogComponent implements OnInit {

  form: FormGroup;
  formData: IManualUsageListItem;
  units: string[] = [];
  statuses: string[] = [];

  constructor(public dialogRef: MatDialogRef<AddEditDialogComponent>,
              public formBuilder: FormBuilder,
              private manualUsageService: ManualUsageService,
              public formValidationService: FormValidationService,
              private staticDataService: StaticDataService,
              @Optional() @Inject(MAT_DIALOG_DATA) public itemId: number,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.statuses = this.staticDataService.statues;
    this.units = this.staticDataService.stockUnits;

    if (this.isUpdating()) {

      this.manualUsageService.view(this.itemId).subscribe((data: IManualUsageListItem) => {
        this.initForm(data);
      }, (error) => {
        this.matSnackBar.open('ERROR: could not load item details');
        console.error('ERROR: could not load get item details', error);
      });

    } else {
      this.initForm();
    }
  }

  initForm(data?: IManualUsageListItem) {
    this.form = this.formBuilder.group({
      id: data?.id,
      name_dari: [data?.name_dari, this.formValidationService.required.validator],
      name_english: [data?.name_english, this.formValidationService.required.validator],
      available_quantity: [data?.available_quantity || 0, this.formValidationService.required.validator],
      unit: [data?.unit, this.formValidationService.required.validator],
      status: [data?.status, this.formValidationService.required.validator],
      acceptable_limit: [data?.acceptable_limit, this.formValidationService.required.validator],
    });
  }

  submit(formData: IManualUsageListItem) {
    if (!this.isFormValid(formData)) {
      return;
    }

    if (this.isUpdating()) {

      this.manualUsageService.update(formData).subscribe(() => {
        this.matSnackBar.open('OK: item updated');
        this.dialogRef.close();
      }, (err) => {
        this.matSnackBar.open('ERROR: could not update item');
        console.error('ERROR: could not update item', err);
      });

    } else {

      this.manualUsageService.store(formData).subscribe(() => {
        this.matSnackBar.open('OK: item added');
        this.dialogRef.close();
      }, (err) => {
        this.matSnackBar.open('ERROR: could not add item');
        console.error('ERROR: could not add item', err);
      });
    }
  }

  isFormValid(formData: IManualUsageListItem) {

    if (!this.formValidationService.getValidNumber(formData.acceptable_limit)) {
      this.matSnackBar.open('ERROR: Limit has an invalid format.');
      return false;
    }

    return true;
  }

  public isUpdating(): boolean {
    return !!this.itemId;
  }

}
