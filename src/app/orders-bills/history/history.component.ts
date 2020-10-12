import {Component, OnInit} from '@angular/core';
import {ITable, OrdersBillsService} from "../orders-bills.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormValidationService} from "../../services/form-validation.service";
import {OrderDetailsDialogComponent} from "../add-edit-dialog/order-details-dialog/order-details-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.styl']
})
export class HistoryComponent implements OnInit {
  isExpanded: boolean = true;
  tables: ITable[] = [];
  form: FormGroup;
  searchResultList: any = [];
  isSearched: boolean = false;

  constructor(private ordersBillsService: OrdersBillsService,
              public formBuilder: FormBuilder,
              public dialog: MatDialog,
              public formValidationService: FormValidationService,) {
  }

  ngOnInit(): void {
    this.ordersBillsService.index().subscribe((tables: any) => {
      this.tables = tables.data;
    }, err => {
    });
    this.form = this.formBuilder.group({
      startDatetime: [null, this.formValidationService.required.validator],
      endDatetime: [null, this.formValidationService.required.validator],
      orderId: null,
      customerName: null,
      table: null
    } as any);
  }

  submit(formData: {}, panel) {
    for (const field in formData) {
      if (!formData[field]) {
        delete formData[field];
      }
    }
    panel.close();
    this.ordersBillsService.search(formData).subscribe(res => {
      this.searchResultList = res.data;
      this.isSearched = true;

    })
  }

  view(item) {
    item.id = item.order_id
    this.dialog.open(OrderDetailsDialogComponent, {
      width: '900px',
      data: item,
      disableClose: true
    });
  }

}
