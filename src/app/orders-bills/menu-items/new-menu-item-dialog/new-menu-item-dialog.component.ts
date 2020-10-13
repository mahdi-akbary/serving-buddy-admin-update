import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OrdersBillsService} from "../../orders-bills.service";
import {FormValidationService} from "../../../services/form-validation.service";
import {AuthService} from "../../../services/auth.service";
import {StaticDataService} from "../../../services/static-data.service";

@Component({
  selector: 'app-new-menu-item-dialog',
  templateUrl: './new-menu-item-dialog.component.html',
  styleUrls: ['./new-menu-item-dialog.component.styl']
})
export class NewMenuItemDialogComponent implements OnInit {

  form: FormGroup;
  statuses: any[];
  categories: any[] = []

  constructor(
    public dialogRef: MatDialogRef<NewMenuItemDialogComponent>,
    public formBuilder: FormBuilder,
    private ordersBillsService: OrdersBillsService,
    private authService: AuthService,
    private staticDataService: StaticDataService,
    public formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.statuses = this.staticDataService.statues;
    this.ordersBillsService.gerCategories().subscribe((res: any) => {
      this.categories = res.data
    });
    this.form = this.formBuilder.group({
      price: [this.data && this.data.price, this.formValidationService.required.validator],
      category: [this.data && this.data.category, this.formValidationService.required.validator],
      dari: [this.data && this.data.name_dari, this.formValidationService.required.validator],
      english: [this.data && this.data.name_english, this.formValidationService.required.validator],
    });
    this.ordersBillsService.gerCategories().subscribe((res: any) => {
      this.categories = res.data
      if (this.data && this.data.category_id) {
        this.categories.forEach(category => {
          if (category.id === this.data.category_id) {
            this.form.get('category').setValue(category)
          }
        })
      }
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
      this.ordersBillsService.updateItems({...temp, ...formData}).subscribe(res => {
        this.dialogRef.close(true)
      })
    } else {
      this.ordersBillsService.storeItems(formData).subscribe((res) => {
        this.dialogRef.close(true)
      }, (err) => {
      })

    }
  }


}
