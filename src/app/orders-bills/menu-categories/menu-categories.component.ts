import {Component, OnInit} from '@angular/core';
import {OrdersBillsService} from "../orders-bills.service";
import {MatDialog} from "@angular/material/dialog";
import {NewMenuCategoryDialogComponent} from "./new-menu-category-dialog/new-menu-category-dialog.component";

@Component({
  selector: 'app-menu-categories',
  templateUrl: './menu-categories.component.html',
  styleUrls: ['./menu-categories.component.styl']
})
export class MenuCategoriesComponent implements OnInit {
  menuCategories: any[] = [];

  constructor(private ordersBillsService: OrdersBillsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.ordersBillsService.categories().subscribe(res => {
      this.menuCategories = res.data
    })
  }

  add() {
    const dialogRef = this.dialog.open(NewMenuCategoryDialogComponent, {
      width: '300px',
      data: {menuCategories: this.menuCategories},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      }
    });

  }

  update(category) {
    console.log(category)
    const dialogRef = this.dialog.open(NewMenuCategoryDialogComponent, {
      width: '300px',
      data: category,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      }
    });
  }

}
