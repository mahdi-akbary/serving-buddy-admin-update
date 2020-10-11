import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrdersBillsService} from "../../../orders-bills.service";

@Component({
  selector: 'app-payment-history-dialog',
  templateUrl: './payment-history-dialog.component.html',
  styleUrls: ['./payment-history-dialog.component.styl']
})
export class PaymentHistoryDialogComponent implements OnInit {
  paymentHistoryList: any[] = []

  constructor(
    public dialogRef: MatDialogRef<PaymentHistoryDialogComponent>,
    private ordersBillsService: OrdersBillsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.ordersBillsService.paymentHistory(this.data.id).subscribe(historyList => {
      this.paymentHistoryList = historyList.data
      console.log('-----------------------')
      console.log(historyList)
      console.log('-----------------------')
    })
  }
}
