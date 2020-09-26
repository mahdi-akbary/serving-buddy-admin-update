import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {IOrdersSummary, ITable, OrdersBillsService} from "../orders-bills.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormValidationService} from "../../services/form-validation.service";
import {NewCustomerDialogComponent} from "./new-customer-dialog/new-customer-dialog.component";

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.styl']
})
export class AddEditDialogComponent implements OnInit {
  ordersSummary: IOrdersSummary[] = [];
  tables: ITable[] = [];
  transferForm: FormGroup
  selectedOrder = null;

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    private ordersBillsService: OrdersBillsService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.setOrdersSummary();
  }

  setOrdersSummary() {
    this.ordersBillsService.getOrdersSummary(this.data.tableNumber).subscribe((ordersSummary: any) => {
      this.ordersSummary = ordersSummary.data as IOrdersSummary[];
    }, error => {
      console.error(error);
    });
  }

  AddNewCustomer() {
    const dialogRef = this.dialog.open(NewCustomerDialogComponent, {
      width: '300px',
      data: {tableNumber: this.data.tableNumber},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.setOrdersSummary()
      }
    });
  }

  enableTransfer() {
    console.log(this.selectedOrder, '<<<<<<<<<<<<<<<<,,')
    this.ordersBillsService.index().subscribe((tables: any) => {
      this.transferForm = this.formBuilder.group({
        destinationTableId: [null, this.formValidationService.required.validator],
        orderId: this.selectedOrder && this.selectedOrder.id
      } as any);
      this.tables = tables.data;
    }, err => {
    })
  }

  transfer(formData) {
    console.log(formData)
    this.ordersBillsService.transfer(formData).subscribe(() => {
      this.ordersSummary = this.ordersSummary.filter(element => element.id !== this.selectedOrder.id)
      this.selectedOrder = null;
    }, err => {

    })
  }
  listOrders(){}


}
