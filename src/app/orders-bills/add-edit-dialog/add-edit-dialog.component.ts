import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {IMiscellaneousItem, IOrder, IOrdersSummary, ITable, OrdersBillsService} from "../orders-bills.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormValidationService} from "../../services/form-validation.service";
import {NewCustomerDialogComponent} from "./new-customer-dialog/new-customer-dialog.component";
import {NewOrderDialogComponent} from "./new-order-dialog/new-order-dialog.component";
import {TableHistoryDialogComponent} from "./table-history-dialog/table-history-dialog.component";
import {OrderDetailsDialogComponent} from "./order-details-dialog/order-details-dialog.component";

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.styl']
})
export class AddEditDialogComponent implements OnInit {
  ordersSummary: IOrdersSummary[] = [];
  tables: ITable[] = [];
  transferForm: FormGroup;
  selectedOrder: IOrdersSummary = null;
  customerOrder: IOrder = null;
  generationDate;
  tempMiscellaneousItem = {
    amount: null,
    notes: null
  } as IMiscellaneousItem;

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
      if (result) {
        this.setOrdersSummary()
      }
    });
  }

  enableTransfer() {
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
    this.ordersBillsService.transfer(formData).subscribe(() => {
      this.ordersSummary = this.ordersSummary.filter(element => element.id !== this.selectedOrder.id)
      this.selectedOrder = null;
    }, err => {

    })
  }

  listOrders(order: IOrdersSummary) {
    this.ordersBillsService.show(order.id).subscribe((orderDetails: IOrder | any) => {
        this.customerOrder = orderDetails.data;
        this.generationDate = new Date();
        this.tempMiscellaneousItem.amount = this.customerOrder.miscellaneous && this.customerOrder.miscellaneous.amount;
        this.tempMiscellaneousItem.notes = this.customerOrder.miscellaneous && this.customerOrder.miscellaneous.notes;
      },
      (error => {
        console.error(error);
      }));
  }

  showOrderDetails(order) {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '850px',
      data: order,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setOrdersSummary();
      }
    });
  }

  AddNewOrder(order: IOrdersSummary | any) {
    const dialogRef = this.dialog.open(NewOrderDialogComponent, {
      width: '300px',
      data: {tableId: this.data.tableNumber, orderId: order.id, ...order},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listOrders(order)
      }
    });
  }

  deleteOrder(orderDetail) {
    this.ordersBillsService.deleteOrder(orderDetail.id, orderDetail.order_item_id).subscribe((res) => {
      this.listOrders(this.selectedOrder);
    }, (err) => {
    })
  }

  showHistory(ordersSummary) {
    const dialogRef = this.dialog.open(TableHistoryDialogComponent, {
      width: '450px',
      data: ordersSummary,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }
}
