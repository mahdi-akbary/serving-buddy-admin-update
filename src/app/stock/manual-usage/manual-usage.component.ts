import {Component, OnInit} from '@angular/core';
import {IManualUsageListItem, IStockListItemIdentifier} from '../stock.types';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ManualUsageService} from './manual-usage.service';
import {StaticDataService} from '../../services/static-data.service';
import {FormValidationService} from '../../services/form-validation.service';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {StockManipulationDialogComponent} from '../stock-manipulation-dialog/stock-manipulation-dialog.component';
import {AddEditDialogComponent} from './add-edit-dialog/add-edit-dialog.component';

@Component({
  selector: 'app-manual-usage',
  templateUrl: './manual-usage.component.html',
  styleUrls: ['./manual-usage.component.styl']
})
export class ManualUsageComponent implements OnInit {

  public generationDate: Date;
  public chosenRecord: number;

  public records: IManualUsageListItem[] = [];

  public currentItem;

  public statuses: string[];
  public stockUnits: string[];

  constructor(private matSnackBar: MatSnackBar,
              private authService: AuthService,
              private manualUsageService: ManualUsageService,
              private staticDataService: StaticDataService,
              private formValidationService: FormValidationService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.statuses = this.staticDataService.statues;
    this.stockUnits = this.staticDataService.stockUnits;
  }

  list() {
    this.manualUsageService.list().subscribe((records: IManualUsageListItem[]) => {
      this.matSnackBar.open('OK: list was successful.');
      this.records = records;
      this.generationDate = new Date();
    }, error => {
      this.matSnackBar.open('ERROR: List failed.');
      console.error('ERROR: List failed.', error);
    });
  }

  public print() {
    window.print();
  }

  load(stockManualItemId: number) {
    this.manualUsageService.view(stockManualItemId)
      .subscribe((record: IManualUsageListItem) => {
        this.currentItem = record;
      }, error => {
        console.error(error);
        this.matSnackBar.open('ERROR: View failed.');
      });
  }

  stockManipulationDialog(itemId: number) {
    const identifier: IStockListItemIdentifier = {
      item_id: itemId,
      usage_type: 'Manual',
      ui_switch: 'add-usage'
    };
    this.matDialog.open(StockManipulationDialogComponent, {
      width: '800px',
      disableClose: true,
      data: identifier
    }).afterClosed().subscribe(() => {
      this.reset();
      this.list();
    });
  }

  addEditDialog(itemId?: number) {
    this.matDialog.open(AddEditDialogComponent, {
      width: '300px',
      disableClose: true,
      data: itemId
    })
      .afterClosed()
      .subscribe(() => {
        this.list();
      });
  }

  reset() {
    this.records = [];
    this.chosenRecord = undefined;
  }

}
