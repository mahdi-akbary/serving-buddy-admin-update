import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormValidationService} from '../../services/form-validation.service';
import {ExpensesService} from '../expenses.service';
import {IRawExpense} from '../expenses.types';
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
              @Inject(MAT_DIALOG_DATA) public data: any,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: [undefined, this.formValidationService.required.validator],
      datetime: [undefined, this.formValidationService.required.validator],
      description: [undefined, this.formValidationService.required.validator],
    });
  }

  submit(formData: IRawExpense) {
    this.expensesService.store(formData).subscribe((res) => {
      this.matSnackBar.open('OK: expense added');
      this.dialogRef.close()
    }, (err) => {
      this.matSnackBar.open('ERROR: could not add expense');
      console.error('ERROR: could not add expense', err);
    })
  }

  reset() {

  }

}
