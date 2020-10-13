import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrdersBillsService} from "../../orders-bills.service";

@Component({
  selector: 'app-item-history-dialog',
  templateUrl: './item-history-dialog.component.html',
  styleUrls: ['./item-history-dialog.component.styl']
})
export class ItemHistoryDialogComponent implements OnInit {
  itemHistoryList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ItemHistoryDialogComponent>,
    private ordersBillsService: OrdersBillsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.ordersBillsService.itemHistory(this.data.id).subscribe(res => {
      this.itemHistoryList = res.data
    })
  }
}
