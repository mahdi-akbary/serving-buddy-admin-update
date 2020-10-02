import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICustomer, IMenuCategoryMinimal, OrdersBillsService} from "../../orders-bills.service";
import {FormValidationService} from "../../../services/form-validation.service";

@Component({
  selector: 'app-new-order-dialog',
  templateUrl: './new-order-dialog.component.html',
  styleUrls: ['./new-order-dialog.component.styl']
})
export class NewOrderDialogComponent implements OnInit {

  form: FormGroup;
  menuCategoriesMinimal: IMenuCategoryMinimal[] | any[];
  menuItemsMinimal: any;

  constructor(
    public dialogRef: MatDialogRef<NewOrderDialogComponent>,
    public formBuilder: FormBuilder,
    private ordersBillsService: OrdersBillsService,
    public formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tableId: this.data && this.data.tableId,
      orderId: this.data && this.data.orderId,
      itemId: [this.data && this.data.itemId, this.formValidationService.required.validator],
      provider: [this.data && this.data.provider, this.formValidationService.required.validator],
      quantity: [this.data && this.data.count, this.formValidationService.required.validator],
      notes: this.data && this.data.notes
    } as any);
    this.form.get('provider').valueChanges.subscribe(value => {
      if (value && value.id) {
        this.listSelectedCategoryItems(value.id)
      }
    });
    this.listCategories();
  }

  submit(formData: any) {
    if (this.data && this.data.order_item_id) {
      this.ordersBillsService.updateOrder({
        count: formData.quantity,
        orderId: formData.orderId,
        id: this.data.order_item_id
      }).subscribe((res) => {
        this.dialogRef.close(true)
      }, (err) => {
      })
    } else {
      formData.provider.id === 1 ? formData.provider = 'Hookah' : (formData.provider.id === 3 ? formData.provider = 'Kitchen' : formData.provider = 'None');
      // todo update db with a slug field and remove the above code that's based on ID
      this.ordersBillsService.storeNewOrder(formData).subscribe((res) => {
        this.dialogRef.close(true)
      }, (err) => {
      })
    }
  }


  listCategories() {
    this.ordersBillsService
      .gerCategories()
      .subscribe(categories => {
        this.menuCategoriesMinimal = categories.data;
        if (this.data && this.data.order_item_id) {
          const item = this.findSelectedItemInDropdown(this.data, categories.data, 'category_id');
          this.form.get('provider').setValue(item);
          this.form.get('provider').disable();
          this.listSelectedCategoryItems(item.id);
        }
      }, (error => {
        console.error(error);
      }));

  }

  listSelectedCategoryItems(selectedCategoryId) {
    this.ordersBillsService
      .getItems(selectedCategoryId)
      .subscribe(items => {
        this.menuItemsMinimal = items.data;
        if (this.data && this.data.order_item_id) {
          const item = this.findSelectedItemInDropdown(this.data, items.data, 'item_id');
          this.form.get('itemId').setValue(item.id);
          this.form.get('itemId').disable();
        }
      }, (error => {
        console.error(error);
      }));
  }

  findSelectedItemInDropdown(data, list, fieldName: string) {
    return list.find(item => item.id == data[fieldName])
  }
}
