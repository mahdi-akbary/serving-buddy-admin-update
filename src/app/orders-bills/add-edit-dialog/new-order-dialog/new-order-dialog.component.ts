import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-order-dialog',
  templateUrl: './new-order-dialog.component.html',
  styleUrls: ['./new-order-dialog.component.styl']
})
export class NewOrderDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewOrderDialogComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      customer_name: null
    })
  }
  submit(formData){
    console.log(formData)
  }
  reset(){

  }

}
