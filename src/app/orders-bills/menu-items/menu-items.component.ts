import {Component, OnInit} from '@angular/core';
import {ITable, OrdersBillsService} from "../orders-bills.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailsDialogComponent} from "../add-edit-dialog/order-details-dialog/order-details-dialog.component";
import {StaticDataService} from "../../services/static-data.service";
import {NewMenuItemDialogComponent} from "./new-menu-item-dialog/new-menu-item-dialog.component";
import {ItemHistoryDialogComponent} from "./item-history-dialog/item-history-dialog.component";

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.styl']
})
export class MenuItemsComponent implements OnInit {
  isExpanded: boolean = true;
  tables: ITable[] = [];
  form: FormGroup;
  searchResultList: any = [];
  isSearched: boolean = false;
  statuses: any[];
  categories: any[] = []
  items: any[] = []
  panel: any;


  constructor(private ordersBillsService: OrdersBillsService,
              public formBuilder: FormBuilder,
              public dialog: MatDialog,
              private staticDataService: StaticDataService) {
  }

  ngOnInit(): void {
    this.statuses = this.staticDataService.statues;
    this.ordersBillsService.gerCategories().subscribe((res: any) => {
      this.categories = res.data
    });
    this.form = this.formBuilder.group({
      category: null,
      status: null,
      item: null,
    } as any);
    this.form.get('category').valueChanges.subscribe(value => {
      this.ordersBillsService
        .getItems(value.id)
        .subscribe(items => {
          this.items = items.data;
        }, (error => {
          console.error(error);
        }));
    })
  }

  submit(formData: any, panel) {
    for (const field in formData) {
      if (!formData[field]) {
        delete formData[field];
      }
    }
    if (formData && formData.category) {
      formData.categoryId = formData.category.id
      delete formData.category
    }
    if (formData && formData.item) {
      formData.itemId = formData.item.id
      delete formData.item
    }
    this.panel = panel;
    this.ordersBillsService.searchItems(formData).subscribe(res => {
      panel.close();
      this.searchResultList = res.data;
      this.isSearched = true;

    })
  }

  updateItem(item) {
    const dialogRef = this.dialog.open(NewMenuItemDialogComponent, {
      width: '300px',
      data: item,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submit(this.form.value, this.panel)
      }
    });
  }

  addNewItem() {
    this.dialog.open(NewMenuItemDialogComponent, {
      width: '300px',
      data: {},
      disableClose: true
    });
  }
  itemHistory(item) {
    this.dialog.open(ItemHistoryDialogComponent, {
      width: '800px',
      data: item,
      disableClose: true
    });
  }
}
