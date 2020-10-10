import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormValidationService} from '../services/form-validation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StockService} from './stock.service';
import {IRawStockListItem, IStockListItem, IStockListItemIdentifier} from './stock.types';
import {AddCorrectDialogComponent} from './add-correct-dialog/add-correct-dialog.component';

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

  addEditDialog(identifier: IStockListItemIdentifier, isCorrecting: boolean) {
    identifier.is_correcting = isCorrecting;
    this.matDialog.open(AddCorrectDialogComponent, {
      width: '800px',
      disableClose: true,
      data: identifier
    }).afterClosed().subscribe(() => {
      this.reset();
      this.list();
    });
  }

  reset () {
    this.records = [];
    this.chosenRecord = undefined;
  }
}
