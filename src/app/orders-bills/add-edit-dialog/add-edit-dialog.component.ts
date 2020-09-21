import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NewOrderDialogComponent} from "./new-order-dialog/new-order-dialog.component";
import {IOrdersSummary, OrdersBillsService} from "../orders-bills.service";

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.styl']
})
export class AddEditDialogComponent implements OnInit {
  ordersSummary: IOrdersSummary[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    private ordersBillsService: OrdersBillsService,
    public dialog: MatDialog,
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

  AddOrderFor() {
    const dialogRef = this.dialog.open(NewOrderDialogComponent, {
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


}
