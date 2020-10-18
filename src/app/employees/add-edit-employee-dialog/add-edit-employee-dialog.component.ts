import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {StaticDataService} from "../../services/static-data.service";
import {FormValidationService} from "../../services/form-validation.service";
import {EmployeesService} from "../employees.service";

@Component({
  selector: 'app-add-edit-employee-dialog',
  templateUrl: './add-edit-employee-dialog.component.html',
  styleUrls: ['./add-edit-employee-dialog.component.styl']
})
export class AddEditEmployeeDialogComponent implements OnInit {

  form: FormGroup;
  statuses: any[];

  constructor(
    public dialogRef: MatDialogRef<AddEditEmployeeDialogComponent>,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private employeesService: EmployeesService,
    private staticDataService: StaticDataService,
    public formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.statuses = this.staticDataService.statues;
    this.form = this.formBuilder.group({
      designation: [this.data && this.data.designation, this.formValidationService.required.validator],
      fatherName: [this.data && this.data.father_name, this.formValidationService.required.validator],
      name: [this.data && this.data.name, this.formValidationService.required.validator],
      notes: this.data && this.data.notes,
      salary: [this.data && this.data.salary, this.formValidationService.required.validator],
      status: [this.data && this.data.status, this.formValidationService.required.validator],
    });
    if (this.data && this.data.isViewMode) {
      this.form.disabled;
    }
  }

  submit(formData) {
    if (this.data && this.data.id) {
      formData.id = this.data.id;
      const temp = {
        lastUpdate: {
          by: {id: this.authService.user.id, name: this.authService.user.name},
          datetime: new Date()
        }
      };
      this.data.status = formData.status;
      this.employeesService.updateEmployee({...temp, ...formData}).subscribe(res => {
        this.dialogRef.close(true)
      })
    } else {
      this.employeesService.storeEmployee(formData).subscribe((res) => {
        this.dialogRef.close(true)
      }, (err) => {
      })

    }
  }


}
