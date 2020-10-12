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

    this.form = this.formBuilder.group({
      value: [null, this.formValidationService.required.validator],
      note: '',
    } as any);
    if (this.data.type === 'discount') {
      this.form.get('value').setValue(this.data && this.data.discount)
    }
    if (this.data.type === 'misc item') {
      this.form.get('value').setValue(this.data && this.data.miscellaneous_amount)
      this.form.get('note').setValue(this.data && this.data.miscellaneous_notes)
    }
  }

  submit(formData: any) {
    let temp: any;
    let url = '';
    if (this.data.type === 'payment') {
      temp = {id: this.data.id, paymentToAdd: formData.value};
      url = 'payment';
    } else if (this.data.type === 'discount') {
      temp = {
        id: this.data.id,
        discount: {amount: formData.value, by: {id: this.authService.user.id, name: this.authService.user.name}}
      };
      url = 'discount';
    } else if (this.data.type === 'misc item') {
      temp = {
        orderId: this.data.id,
        grossTotal: (this.data && this.data.miscellaneous_amount) ? this.data.gross_total - this.data.miscellaneous_amount + formData.value :
          this.data.gross_total + formData.value,
        miscellaneousItem: {amount: formData.value, notes: formData.note}
      };
      url = 'miscellaneous';
    }

    this.ordersBillsService.updateInput(url, temp).subscribe((res) => {
      this.dialogRef.close(true)
    }, (err) => {
    })
  }

  reset() {

  }

}
