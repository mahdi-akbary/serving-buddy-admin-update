import {Component, OnInit} from '@angular/core';
import {ITable, OrdersBillsService} from "../orders-bills.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.styl']
})
export class HistoryComponent implements OnInit {
  isExpanded: boolean = true;
  tables: ITable[] = [];
  form: FormGroup;

  constructor(private ordersBillsService: OrdersBillsService, public formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.ordersBillsService.index().subscribe((tables: any) => {
      this.tables = tables.data;
    }, err => {
    })
    this.form = this.formBuilder.group({
      startDatetime: null,
      endDatetime: null,
      orderId: null,
      customerName: null,
      table: null
    } as any);
  }

  submit(formData: {}) {
    for (const field in formData) {
      if (!formData[field]) {
        delete formData[field];
      }
    }
    this.ordersBillsService.search(formData).subscribe(res => {
      console.log(res)
    })
  }

}
