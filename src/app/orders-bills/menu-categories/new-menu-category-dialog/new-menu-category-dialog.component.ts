import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OrdersBillsService} from "../../orders-bills.service";
import {FormValidationService} from "../../../services/form-validation.service";
import {AuthService} from "../../../services/auth.service";
import {StaticDataService} from "../../../services/static-data.service";

@Component({
  selector: 'app-new-menu-category-dialog',
  templateUrl: './new-menu-category-dialog.component.html',
  styleUrls: ['./new-menu-category-dialog.component.styl']
})
export class NewMenuCategoryDialogComponent implements OnInit {

  form: FormGroup;
  statuses: any[];
  providers: any[];
  printers: any[];
  trackInStockOptions: any[];

  constructor(
    public dialogRef: MatDialogRef<NewMenuCategoryDialogComponent>,
    public formBuilder: FormBuilder,
    private ordersBillsService: OrdersBillsService,
    private authService: AuthService,
    private staticDataService: StaticDataService,
    public formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.statuses = this.staticDataService.statues;
    this.providers = this.staticDataService.providers;
    this.printers = this.staticDataService.printers;
    this.trackInStockOptions = this.staticDataService.yesNoOptions;
    this.form = this.formBuilder.group({
      printer: [this.data && this.data.printer, this.formValidationService.required.validator],
      provider: [this.data && this.data.provider, this.formValidationService.required.validator],
      trackInStock: [this.data && this.data.track_in_stock, this.formValidationService.required.validator],
      dari: [this.data && this.data.name_dari, this.formValidationService.required.validator],
      english: [this.data && this.data.name_english, this.formValidationService.required.validator],
    });
    if (this.data && this.data.id) {
      this.form.addControl('status', new FormControl(this.data.status, this.formValidationService.required.validator));
    }
  }

  submit(formData) {
    formData.name = {english: formData.english, dari: formData.dari};
    delete formData.english;
    delete formData.dari;
    if (this.data && this.data.id) {
      formData.id = this.data.id;
      const temp = {
        lastUpdate: {
          by: {id: this.authService.user.id, name: this.authService.user.name},
          datetime: new Date()
        }
      };
      this.data.status = formData.status;
      this.ordersBillsService.updateCategories({...temp, ...formData}).subscribe(res => {
        this.dialogRef.close(true)
      })
    } else {
      this.ordersBillsService.storeCategories(formData).subscribe((res) => {
        this.dialogRef.close(true)
      }, (err) => {
      })

    }
  }


}
