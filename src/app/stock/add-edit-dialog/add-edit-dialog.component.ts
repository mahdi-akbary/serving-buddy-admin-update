import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormValidationService} from '../../services/form-validation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StockService} from '../stock.service';
import {IRawStockListItem, IStockListItemIdentifier} from '../stock.types';

@Component({
  selector: 'add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.styl']
})
export class AddEditDialogComponent implements OnInit {

  form: FormGroup;
  formData: any = {};

  constructor(public dialogRef: MatDialogRef<AddEditDialogComponent>,
              public formBuilder: FormBuilder,
              private stockService: StockService,
              public formValidationService: FormValidationService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: IStockListItemIdentifier,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.isUpdating()) {

      this.stockService.view(this.data.item_id, this.data.usage_type).subscribe((data: IRawStockListItem) => {
        this.initForm(data);
      }, (error) => {
        this.matSnackBar.open('ERROR: could not get stock details');
        console.error('ERROR: could not get stock details', error);
      });

    } else {
      this.initForm();
    }
  }

  initForm(data?: IRawStockListItem) {
    this.form = this.formBuilder.group({
      id: data?.id,
      name_english: [data?.name_english, this.formValidationService.required.validator],
      item_id: [data?.item_id, this.formValidationService.required.validator],
      available_quantity: [data?.available_quantity, this.formValidationService.required.validator],
      category_name_english: [data?.category_name_english, this.formValidationService.required.validator],
      quantity_to_update: [data?.quantity_to_update, this.formValidationService.required.validator],
      unit: [data?.unit, this.formValidationService.required.validator],
      notes: [data?.notes, this.formValidationService.required.validator],
    });
  }

  submit(formData: IRawStockListItem) {

    if (this.isUpdating()) {

      this.stockService.update(formData).subscribe(() => {
        this.matSnackBar.open('OK: expense updated');
        this.dialogRef.close();
      }, (err) => {
        this.matSnackBar.open('ERROR: could not update expense');
        console.error('ERROR: could not update expense', err);
      });

    } else {

      this.stockService.store(formData).subscribe(() => {
        this.matSnackBar.open('OK: expense added');
        this.dialogRef.close();
      }, (err) => {
        this.matSnackBar.open('ERROR: could not add expense');
        console.error('ERROR: could not add expense', err);
      });

    }

  }

  private isUpdating(): boolean {
    return !!this.data;
  }

}
