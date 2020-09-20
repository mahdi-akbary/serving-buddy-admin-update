import {Component, OnInit} from '@angular/core';
import {ITable, OrdersBillsService} from "./orders-bills.service";
import {MatDialog} from "@angular/material/dialog";
import {AddEditOrdersDialogComponent} from "./add-edit-orders-dialog/add-edit-orders-dialog.component";


@Component({
  selector: 'app-orders-bills',
  templateUrl: './orders-bills.component.html',
  styleUrls: ['./orders-bills.component.styl']
})
export class OrdersBillsComponent implements OnInit {
  tables: ITable[];
  constructor(private ordersBillsService: OrdersBillsService,
              public dialog: MatDialog) {
  }
  addEditOrdersDialog(tableNumber: number): void {
    const dialogRef = this.dialog.open(AddEditOrdersDialogComponent, {
      width: '700px',
      data: {tableNumber: tableNumber}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.ordersBillsService.index().subscribe((tables: any) => {
      console.log(tables)
      this.tables = tables.data;
    })
  }

}
