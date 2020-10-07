import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormValidationService} from '../../services/form-validation.service';
import {ExpensesService} from '../expenses.service';
import {IExpense} from '../expenses.types';
import {MatSnackBar} from '@angular/material/snack-bar';

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
              private expensesService: ExpensesService,
              public formValidationService: FormValidationService,
              @Optional() @Inject(MAT_DIALOG_DATA) public expenseId: number,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.isUpdating()) {

      this.expensesService.view(this.expenseId).subscribe((data: IExpense) => {
        this.initForm(data);
      }, (error) => {
        this.matSnackBar.open('ERROR: could not get expense details');
        console.error('ERROR: could not get expense details', error);
      });

    } else {
      this.initForm();
    }
  }


  initForm(data?: IExpense) {
    this.form = this.formBuilder.group({
      id: data?.id,
      amount: [data?.amount, this.formValidationService.required.validator],
      datetime: [data?.datetime, this.formValidationService.required.validator],
      description: [data?.description, this.formValidationService.required.validator],
    });
  }

  submit(formData: IExpense) {

    if (this.isUpdating()) {

      this.expensesService.update(formData).subscribe(() => {
        this.matSnackBar.open('OK: expense updated');
        this.dialogRef.close();
      }, (err) => {
        this.matSnackBar.open('ERROR: could not update expense');
        console.error('ERROR: could not update expense', err);
      });

    } else {

      this.expensesService.store(formData).subscribe(() => {
        this.matSnackBar.open('OK: expense added');
        this.dialogRef.close();
      }, (err) => {
        this.matSnackBar.open('ERROR: could not add expense');
        console.error('ERROR: could not add expense', err);
      });

    }

  }

  private isUpdating(): boolean {
    return !!this.expenseId;
  }

}
