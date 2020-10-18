import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormValidationService} from '../services/form-validation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StockService} from './stock.service';
import {IRawStockListItem, IStockListItemIdentifier, IStockListItemUiSwitch} from './stock.types';
import {StockManipulationDialogComponent} from './stock-manipulation-dialog/stock-manipulation-dialog.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.styl']
})
export class StockComponent implements OnInit {

  chosenRecord: IStockListItemIdentifier;
  records: IRawStockListItem[] = [];

  constructor(private matDialog: MatDialog,
              public formValidationService: FormValidationService,
              private stockService: StockService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  list() {
    this.stockService.list().subscribe((data: IRawStockListItem[]) => {
      this.matSnackBar.open('OK: list stock');
      this.records = data;
    }, (error) => {
      this.matSnackBar.open('ERROR: failed to list stock');
      console.error('ERROR: failed to list stock', error);
    });
  }

  stockManipulationDialog(identifier: IStockListItemIdentifier, uiSwitch: IStockListItemUiSwitch) {
    identifier.ui_switch = uiSwitch;
    this.matDialog.open(StockManipulationDialogComponent, {
      width: '800px',
      disableClose: true,
      data: identifier
    }).afterClosed().subscribe(() => {
      this.reset();
      this.list();
    });
  }

  reset() {
    this.records = [];
    this.chosenRecord = undefined;
  }
}
