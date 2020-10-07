import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrdersBillsService} from "../../../orders-bills.service";
import {FormValidationService} from "../../../../services/form-validation.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-update-input-dialog',
  templateUrl: './update-input-dialog.component.html',
  styleUrls: ['./update-input-dialog.component.styl']
})
export class UpdateInputDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateInputDialogComponent>,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private ordersBillsService: OrdersBillsService,
    public formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.data)
    this.form = this.formBuilder.group({
      value: [null, this.formValidationService.required.validator],
      note: '',
    } as any);
  }

  submit(formData: any) {
    let temp : any;
    if(this.data.type === 'payment'){
      temp = {id: this.data.id, paymentToAdd: formData.value}
    }else if(this.data.type ==='discount'){
      temp = {id: this.data.id, discount: {amount: formData.value, by: {id: this.authService.user.id, name: this.authService.user.name}}}
    }else if(this.data.type ==='misc item'){
      temp = {orderId: this.data.id, grossTotal: this.data.gross_total, miscellaneousItem: {amount: formData.value, notes:  formData.note}}
    }
    console.log(temp)
    // this.ordersBillsService.storeCustomer(temp).subscribe((res) => {
    //   this.dialogRef.close(true)
    // }, (err) => {
    // })
  }

  reset() {

  }

}
