import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormValidationService} from '../../../services/form-validation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ManualUsageService} from '../manual-usage.service';
import {IRawManualUsageListItem} from '../../stock.types';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.styl']
})
export class AddEditDialogComponent implements OnInit {

  form: FormGroup;
  formData: IRawManualUsageListItem;

  constructor(public dialogRef: MatDialogRef<AddEditDialogComponent>,
              public formBuilder: FormBuilder,
              private manualUsageService: ManualUsageService,
              public formValidationService: FormValidationService,
              @Optional() @Inject(MAT_DIALOG_DATA) public itemId: number,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.isUpdating()) {

      this.manualUsageService.view(this.itemId).subscribe((data: IRawManualUsageListItem) => {
        this.initForm(data);
      }, (error) => {
        this.matSnackBar.open('ERROR: could not item details');
        console.error('ERROR: could not get item details', error);
      });

    } else {
      this.initForm();
    }
  }

  initForm(data?: IRawManualUsageListItem) {
    this.form = this.formBuilder.group({
      id: data?.id,
      name_dari: [data?.name_dari, this.formValidationService.required.validator],
      name_english: [data?.name_english, this.formValidationService.required.validator],
      available_quantity: [data?.available_quantity, this.formValidationService.required.validator],
      unit: [data?.unit, this.formValidationService.required.validator],
      status: [data?.status, this.formValidationService.required.validator],
      acceptable_limit: [data?.acceptable_limit, this.formValidationService.required.validator],
      notes: [data?.notes, this.formValidationService.required.validator],
    });
  }

  submit(formData: IRawManualUsageListItem) {

    if (this.isUpdating()) {
        if (!this.isEditItemFormValid(formData)) {
          return;
        }

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

  isEditItemFormValid(formData: IRawManualUsageListItem) {

    if (!this.formValidationService.getValidNumber(formData.acceptable_limit)) {
      this.matSnackBar.open('ERROR: Limit is not valid.');
      return false;
    }

    return true;
  }

  isAddUsageFormValid(formData: IRawManualUsageListItem) {
    if (!formData.quantity_to_update) {
      this.matSnackBar.open('ERROR: "Quantity to update" is required.');
      return false;
    }

    if (!this.formValidationService.getValidNumber(formData.quantity_to_update)) {
      this.matSnackBar.open('ERROR: "Quantity to update" is not valid.');
      return false;
    }

    return true;
  }

  private isUpdating(): boolean {
    return !!this.itemId;
  }

}
