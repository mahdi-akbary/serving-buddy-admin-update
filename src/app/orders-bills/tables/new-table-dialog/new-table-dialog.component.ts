import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OrdersBillsService} from "../../orders-bills.service";
import {FormValidationService} from "../../../services/form-validation.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-new-table-dialog',
  templateUrl: './new-table-dialog.component.html',
  styleUrls: ['./new-table-dialog.component.styl']
})
export class NewTableDialogComponent implements OnInit {

  form: FormGroup;
  Statuses: any[] = [
    'Disabled',
    'Enabled'
  ];

  constructor(
    public dialogRef: MatDialogRef<NewTableDialogComponent>,
    public formBuilder: FormBuilder,
    private ordersBillsService: OrdersBillsService,
    private authService: AuthService,
    public formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.data && this.data.id, this.formValidationService.required.validator],
    });
    if (this.data && this.data.id) {
      this.form.addControl('status', new FormControl(this.data.status, this.formValidationService.required.validator));
    }
    this.form.get('id').valueChanges.subscribe(value => {
      if (value) {
        let found = false;
        let index = 0;
        this.data.tables.forEach(table => {
          index++;
          if (table.id === value) {
            this.form.get('id').setErrors({'incorrect': true});
            this.form.get('id').markAsDirty()
            found = true;
          }
          if (index === this.data.tables.length && !found) {
            this.form.get('id').setErrors(null);
          }

        })
      }
    })


  }

  submit(formData) {
    if (this.data && this.data.id) {
      const temp = {
        lastUpdate: {
          by: {id: this.authService.user.id, name: this.authService.user.name},
          datetime: new Date()
        }
      };
      this.data.status = formData.status;
      this.ordersBillsService.updateTable({...temp, ...this.data}).subscribe(res => {
        this.dialogRef.close(true)
      })
    } else {
      this.ordersBillsService.storeTable(formData).subscribe((res) => {
        this.dialogRef.close(true)
      }, (err) => {
      })

    }
  }


}
