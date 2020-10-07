import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddEditDialogComponent} from './add-edit-dialog/add-edit-dialog.component';
import {FormValidationService} from '../services/form-validation.service';
import {ExpensesService} from './expenses.service';
import {IRawExpense} from './expenses.types';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.styl']
})
export class ExpensesComponent implements OnInit {

  form: FormGroup;
  chosenRecord;
  records: IRawExpense[] = [];
  totalAmount = 0;

  constructor(private matDialog: MatDialog,
              private formBuilder: FormBuilder,
              public formValidationService: FormValidationService,
              private expensesService: ExpensesService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      start_datetime: [undefined, this.formValidationService.required.validator],
      end_datetime: [undefined, this.formValidationService.required.validator],
    });
  }

  submit(formData: any) {
    this.expensesService.search(formData).subscribe((data: IRawExpense[]) => {
      this.matSnackBar.open('OK: search expenses');
      this.records = data;
      this.calculateTotal();
    }, (error) => {
      this.matSnackBar.open('ERROR: failed to search expenses');
      console.error('ERROR: failed to search expenses', error);
    });
  }

  private calculateTotal() {
    this.records.forEach((item: IRawExpense) => {
      this.totalAmount = this.totalAmount + (+item.amount);
    });
  }

  addEditDialog(id?: number) {
    this.matDialog
      .open(AddEditDialogComponent, {
        width: '800px',
        disableClose: true,
        data: id
      })
      .afterClosed()
      .subscribe(() => {
        this.submit(this.form.value);
      });
  }

  reset() {
    this.records = [];
    this.chosenRecord = undefined;
    this.form.reset();
    this.totalAmount = 0;
  }
}
