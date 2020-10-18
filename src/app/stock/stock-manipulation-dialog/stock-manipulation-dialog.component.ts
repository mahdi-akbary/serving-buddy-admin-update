import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormValidationService} from '../../services/form-validation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StockService} from '../stock.service';
import {IStockListItemIdentifier, IStockManualLog} from '../stock.types';
import {ManualUsageService} from '../manual-usage/manual-usage.service';

@Component({
  selector: 'stock-manipulation-dialog',
  templateUrl: './stock-manipulation-dialog.component.html',
  styleUrls: ['./stock-manipulation-dialog.component.styl']
})
export class StockManipulationDialogComponent implements OnInit {

  form: FormGroup;
  formData: any = {};

  constructor(public dialogRef: MatDialogRef<StockManipulationDialogComponent>,
              public formBuilder: FormBuilder,
              private stockService: StockService,
              private manualUsageService: ManualUsageService,
              public formValidationService: FormValidationService,
              @Optional() @Inject(MAT_DIALOG_DATA) public identifier: IStockListItemIdentifier,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.stockService.view(this.identifier.item_id, this.identifier.usage_type).subscribe((data: IStockManualLog) => {
      data['usage_type'] = 'Manual';
      this.initForm(data);
    }, (error) => {
      this.matSnackBar.open('ERROR: could not get stock details');
      console.error('ERROR: could not get stock details', error);
    });

  }

  initForm(data: IStockManualLog) {
    this.form = this.formBuilder.group({
      id: data.id,
      name_english: [data.name_english, this.formValidationService.required.validator],
      item_id: [data.item_id, this.formValidationService.required.validator],
      available_quantity: [data.available_quantity, this.formValidationService.required.validator],
      category_name_english: [data.category_name_english, this.formValidationService.required.validator],
      quantity_to_update: [data.quantity_to_update, this.formValidationService.required.validator],
      unit: [data.unit, this.formValidationService.required.validator],
      notes: [data.notes, this.formValidationService.required.validator],
      usage_type: [data.usage_type, this.formValidationService.required.validator]
    });
  }

  submit(formData: IStockManualLog) {

    switch (this.identifier.ui_switch) {
      case 'add-quantity':
        this.stockService.addQuantity(formData).subscribe(() => {
          this.matSnackBar.open('OK: quantity corrected');
          this.dialogRef.close();
        }, (err) => {
          this.matSnackBar.open('ERROR: could not correct the quantity');
          console.error('ERROR: could not correct the quantity', err);
        });
        break;
      case 'correction':
        this.stockService.correctQuantity(formData).subscribe(() => {
          this.matSnackBar.open('OK: quantity added');
          this.dialogRef.close();
        }, (err) => {
          this.matSnackBar.open('ERROR: could not add the quantity');
          console.error('ERROR: could not add quantity', err);
        });
        break;
      case 'add-usage':
        this.manualUsageService.addUsage(formData).subscribe(() => {
          this.matSnackBar.open('OK: usage added');
          this.dialogRef.close();
        }, (err) => {
          this.matSnackBar.open('ERROR: could not add the usage');
          console.error('ERROR: could not add usage', err);
        });
        break;
      default:
        this.matSnackBar.open('ERROR: could not submit data to server');
        console.error('ERROR: could not submit data to server, invalid switch value', this.identifier);
    }
  }
}
