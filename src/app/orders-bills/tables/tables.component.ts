import {Component, OnInit} from '@angular/core';
import {OrdersBillsService} from "../orders-bills.service";
import {MatDialog} from "@angular/material/dialog";
import {NewTableDialogComponent} from "./new-table-dialog/new-table-dialog.component";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.styl']
})
export class TablesComponent implements OnInit {
  tables: any[] = [];

  constructor(private ordersBillsService: OrdersBillsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.ordersBillsService.tables().subscribe(res => {
      this.tables = res.data
    })
  }

  add() {
    const dialogRef = this.dialog.open(NewTableDialogComponent, {
      width: '300px',
      data: {tables: this.tables},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      }
    });

  }

  update(table) {
    const dialogRef = this.dialog.open(NewTableDialogComponent, {
      width: '300px',
      data: {id: table.id, status: table.status, name: 'Table ' + table.id},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      }
    });
  }
}
