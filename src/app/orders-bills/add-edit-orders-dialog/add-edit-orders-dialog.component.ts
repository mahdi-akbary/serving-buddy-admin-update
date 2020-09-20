import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-edit-orders-dialog',
  templateUrl: './add-edit-orders-dialog.component.html',
  styleUrls: ['./add-edit-orders-dialog.component.styl']
})
export class AddEditOrdersDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditOrdersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
