import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrdersBillsService} from "../../orders-bills.service";

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
    @Inject(MAT_DIALOG_DATA) public order: any) {
  }

  ngOnInit(): void {
    this.ordersBillsService.show(this.order.id).subscribe((orderDetails: any) => {
      this.currentOrder = orderDetails && orderDetails.data && orderDetails.data[0];
      this.orderItems = orderDetails && orderDetails.data;
      console.log(this.orderItems)
    })
  }
}
