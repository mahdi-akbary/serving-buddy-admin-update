import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from '../users.service';
import {FormValidationService} from '../../../services/form-validation.service';
import {IUser} from '../../settings.types';
import {StaticDataService} from '../../../services/static-data.service';

@Component({
  selector: 'add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.styl']
})
export class AddEditDialogComponent implements OnInit {

  form: FormGroup;
  formData: any = {};
  public userTypes: string[];
  public statuses: string[];

  constructor(public dialogRef: MatDialogRef<AddEditDialogComponent>,
              public formBuilder: FormBuilder,
              private usersService: UsersService,
              public formValidationService: FormValidationService,
              @Optional() @Inject(MAT_DIALOG_DATA) public userId: number,
              private matSnackBar: MatSnackBar,
              private staticDataService: StaticDataService) {
  }

  ngOnInit(): void {
    this.userTypes = this.staticDataService.userTypes;
    this.statuses = this.staticDataService.statues;

    if (this.isUpdating()) {

      this.usersService.view(this.userId).subscribe((data: IUser) => {
        this.initForm(data);
      }, (error) => {
        this.matSnackBar.open('ERROR: could not get user details');
        console.error('ERROR: could not get user details', error);
      });

    } else {
      this.initForm();
    }
  }

  initForm(data?: IUser) {

    const formBlueprint = {
      id: data?.id,
      username: [data?.username, this.formValidationService.required.validator],
      name: [data?.name, this.formValidationService.required.validator],
      user_type: [data?.user_type, this.formValidationService.required.validator],
      password: [undefined],
      confirm_password: [undefined],
      status: [data?.status, this.formValidationService.required.validator],
    };

    if (!this.isUpdating()) {
      formBlueprint.password = <any>([undefined, this.formValidationService.required.validator]);
      formBlueprint.confirm_password = <any>([undefined, this.formValidationService.required.validator]);
    }

    this.form = this.formBuilder.group(formBlueprint);
  }

  submit(formData: IUser) {

    if (!this.isFormValid(formData)) {
      return
    }

    if (this.isUpdating()) {

      this.usersService.update(formData).subscribe(() => {
        this.matSnackBar.open('OK: user updated');
        this.dialogRef.close();
      }, (err) => {
        this.matSnackBar.open('ERROR: could not update user');
        console.error('ERROR: could not update user', err);
      });

    } else {

      this.usersService.store(formData).subscribe(() => {
        this.matSnackBar.open('OK: user added');
        this.dialogRef.close();
      }, (err) => {
        this.matSnackBar.open('ERROR: could not add user');
        console.error('ERROR: could not add user', err);
      });

    }

  }

  isFormValid(formData: IUser) {

    if (formData.password != formData.confirm_password) {
      this.matSnackBar.open('ERROR: Password and confirm password do not match.');
      return false;
    }

    return true;
  }

  public isUpdating(): boolean {
    return !!this.userId;
  }

}
