import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrdersBillsService} from "../../orders-bills.service";

@Component({
  selector: 'app-table-history-dialog',
  templateUrl: './table-history-dialog.component.html',
  styleUrls: ['./table-history-dialog.component.styl']
})
export class TableHistoryDialogComponent implements OnInit {
  customerTableHistoryList: any[] = []

  constructor(
    public dialogRef: MatDialogRef<TableHistoryDialogComponent>,
    private ordersBillsService: OrdersBillsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.ordersBillsService.tableHistory(this.data.id).subscribe(historyList => {
      this.customerTableHistoryList = historyList.data
    })
  }
}
