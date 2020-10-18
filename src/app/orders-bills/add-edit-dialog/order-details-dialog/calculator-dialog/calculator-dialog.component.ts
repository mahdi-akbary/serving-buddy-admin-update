import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-calculator-dialog',
  templateUrl: './calculator-dialog.component.html',
  styleUrls: ['./calculator-dialog.component.styl']
})
export class CalculatorDialogComponent implements OnInit {
  value: number

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

  }
}
