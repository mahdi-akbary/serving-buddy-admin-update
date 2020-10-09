import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OrdersBillsService} from "../../orders-bills.service";
import {UpdateInputDialogComponent} from "./update-input-dialog/update-input-dialog.component";

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.styl']
})
export class OrderDetailsDialogComponent implements OnInit {
  currentOrder: any;
  orderItems: any;

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    private ordersBillsService: OrdersBillsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public order: any) {
  }

  ngOnInit(): void {
    this.ordersBillsService.show(this.order.id).subscribe((orderDetails: any) => {
      this.currentOrder = orderDetails && orderDetails.data && orderDetails.data[0];
      this.orderItems = orderDetails && orderDetails.data;
      this.setGrossTotal(this.orderItems)
      console.log(this.orderItems)
    })
  }

  setGrossTotal(list: any[] = []) {
    let total = 0 as number;
    for (let i = 0; i < list.length; i++) {
      total += list[i].price * list[i].count;
    }
    if (this.currentOrder && this.currentOrder.miscellaneous_amount) {
      total += this.currentOrder.miscellaneous_amount;
    }
    this.currentOrder = {...this.currentOrder, gross_total: total}
  }

  //
  updateInput(type: string) {
    let data: any;
    const dialogRef = this.dialog.open(UpdateInputDialogComponent, {
      width: '400px',
      data: {...this.currentOrder, type: type},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  checkout(order) {
    this.ordersBillsService.checkout({
      id: order.id,
      grossTotal: order.gross_total,
      notes: order.notes
    }).subscribe(res => {
      this.dialogRef.close(true)
    })
  }
}
