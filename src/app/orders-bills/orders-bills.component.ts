import {Component, OnInit} from '@angular/core';
import {ITable, OrdersBillsService} from "./orders-bills.service";
import {MatDialog} from "@angular/material/dialog";
import {AddEditDialogComponent} from "./add-edit-dialog/add-edit-dialog.component";


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

  addEditOrdersDialog(tableNumber: number, isViewMode: boolean = false): void {
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      width: '800px',
      data: {tableNumber: tableNumber, isViewMode: isViewMode},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.setTables()
    });
  }

  ngOnInit(): void {
    this.setTables()
  }

  setTables() {
    this.ordersBillsService.index().subscribe((tables: any) => {
      this.tables = tables.data;
    })
  }

}
