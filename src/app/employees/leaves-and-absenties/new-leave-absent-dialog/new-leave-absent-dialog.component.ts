import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormValidationService} from "../../../services/form-validation.service";
import {AuthService} from "../../../services/auth.service";
import {StaticDataService} from "../../../services/static-data.service";
import {LeavesAndAbsentiesService} from "../leaves-and-absenties.service";

@Component({
  selector: 'app-new-leave-absent-dialog',
  templateUrl: './new-leave-absent-dialog.component.html',
  styleUrls: ['./new-leave-absent-dialog.component.styl']
})
export class NewLeaveAbsentDialogComponent implements OnInit {

  form: FormGroup;
  types: any[];
  days: any[];

  constructor(
    public dialogRef: MatDialogRef<NewLeaveAbsentDialogComponent>,
    public formBuilder: FormBuilder,
    private leavesAndAbsentiesService: LeavesAndAbsentiesService,
    private authService: AuthService,
    private staticDataService: StaticDataService,
    public formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.types = this.staticDataService.dayTypes;
    this.days = this.staticDataService.days;
    this.form = this.formBuilder.group({
      duration: [null, this.formValidationService.required.validator],
      employeeId: [this.data && this.data.id, this.formValidationService.required.validator],
      forDate: [null, this.formValidationService.required.validator],
      notes: null,
      type: [null, this.formValidationService.required.validator],
    });
    this.form.get('duration').valueChanges.subscribe(value => {
      if (value <= 0 || value > 1) {
        this.form.get('duration').setErrors({'incorrect': true});
        this.form.get('duration').markAsDirty()
      } else {
        this.form.get('duration').setErrors(null);
      }
    })
  }

  submit(formData) {

    // if (this.data && this.data.id) {
    //   formData.id = this.data.id;
    //   const temp = {
    //     lastUpdate: {
    //       by: {id: this.authService.user.id, name: this.authService.user.name},
    //       datetime: new Date()
    //     }
    //   };
    //   this.data.status = formData.status;
    //   this.leavesAndAbsentiesService.update({...temp, ...formData}).subscribe(res => {
    //     this.dialogRef.close(true)
    //   })
    // } else {
    formData.forDate = this.data.targetYearMonth + '-' + formData.forDate
    this.leavesAndAbsentiesService.store(formData).subscribe((res) => {
      this.dialogRef.close(true)
    }, (err) => {
    })

    // }
  }


}
