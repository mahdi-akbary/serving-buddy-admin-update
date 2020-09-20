import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NewOrderDialogComponent} from "./new-order-dialog/new-order-dialog.component";

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.styl']
})
export class AddEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  AddOrderFor() {
    const dialogRef = this.dialog.open(NewOrderDialogComponent, {
      width: '300px',
      data: {tableNumber: this.data.tableNumber}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}
