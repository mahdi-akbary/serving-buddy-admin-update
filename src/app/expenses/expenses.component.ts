import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.styl']
})
export class ExpensesComponent implements OnInit {

  form: FormGroup;
  chosenRecord;
  records = [];
  totals:any = {};

  constructor(
    // public dialogRef: MatDialogRef<NewCustomerDialogComponent>,
    public formBuilder: FormBuilder,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      start_date_time: undefined,
      end_date_time: undefined,
    });
  }

  submit(formData: any) {
  }

}
