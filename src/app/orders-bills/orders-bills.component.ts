import {Component, OnInit} from '@angular/core';
import {ITable, OrdersBillsService} from "./orders-bills.service";


@Component({
  selector: 'app-orders-bills',
  templateUrl: './orders-bills.component.html',
  styleUrls: ['./orders-bills.component.styl']
})
export class OrdersBillsComponent implements OnInit {
  tables: ITable[];

  constructor(private ordersBillsService: OrdersBillsService) {
  }

  ngOnInit(): void {
    this.ordersBillsService.index().subscribe((tables: any) => {
      console.log(tables)
      this.tables = tables.data;
    })
  }

}
