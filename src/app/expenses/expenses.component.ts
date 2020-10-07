import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddEditDialogComponent} from './add-edit-dialog/add-edit-dialog.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.styl']
})
export class ExpensesComponent implements OnInit {

  form: FormGroup;
  chosenRecord;
  records = [];
  totals: any = {};

  constructor(private matDialog: MatDialog,
              public formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.form = this.formBuilder.group({
      start_date_time: undefined,
      end_date_time: undefined,
    });
  }

  submit(formData: any) {
  }

  addEditDialog() {
    this.matDialog
      .open(AddEditDialogComponent, {
        width: '800px',
        disableClose: true
      })
      .afterClosed()
      .subscribe(() => {
        this.load();
      });
  }
}
