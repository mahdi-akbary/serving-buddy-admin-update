import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.styl']
})
export class ExpensesComponent implements OnInit {

  form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  submit(formData: any) {
  }

}
