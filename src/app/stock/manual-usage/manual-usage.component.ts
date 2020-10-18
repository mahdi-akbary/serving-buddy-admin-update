import {Component, OnInit} from '@angular/core';
import {IManualUsageListItem, IRawManualUsageListItem, IStockListItemIdentifier} from '../stock.types';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ManualUsageService} from './manual-usage.service';
import {StaticDataService} from '../../services/static-data.service';
import {FormValidationService} from '../../services/form-validation.service';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AddCorrectDialogComponent} from '../add-correct-dialog/add-correct-dialog.component';
import {AddEditDialogComponent} from '../../expenses/add-edit-dialog/add-edit-dialog.component';

@Component({
  selector: 'app-manual-usage',
  templateUrl: './manual-usage.component.html',
  styleUrls: ['./manual-usage.component.styl']
})
export class ManualUsageComponent implements OnInit {

  public generationDate: Date;
  public chosenRecord: number;

  public records: IRawManualUsageListItem[] = [];

  public usageQuantity;

  public correctQuantityFormActive = true;

  public currentItem;

  public statuses: string[];
  public stockUnits: string[];
  public addItemFormActive = true;

  public addUsageFormActive = true;

  public editItemFormActive = true;

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

  // addItemSubmit(currentItem: IManualUsageListItem) {
  //   if (!this.isAddItemFormValid(currentItem)) {
  //     return;
  //   }
  //
  //   this.manualUsageService
  //     .addItemSubmit(currentItem)
  //     .then((data) => {
  //
  //       currentItem.id = data.id;
  //       currentItem.availableQuantity = 0;
  //       currentItem.lastUpdate = {
  //         datetime: new Date(),
  //         by: {
  //           id: this.authService.user.id,
  //           name: this.authService.user.name
  //         }
  //       };
  //       this.records.push(currentItem);
  //
  //       this.matSnackBar.open('OK: New item added successfully.');
  //
  //       this.resetAddItemForm();
  //     })
  //     .catch(error => {
  //       this.matSnackBar.open('ERROR: could not add an item.');
  //       console.error('ERROR: could not add an item.', error.message);
  //     });
  // }

  isAddItemFormValid(formData: IManualUsageListItem) {

    if (!formData.name || !formData.name.english) {
      this.matSnackBar.open('ERROR: Name (English) is required.');
      return false;
    }

    if (!formData.name || !formData.name.dari) {
      this.matSnackBar.open('ERROR: Name (Dari) is required.');
      return false;
    }

    if (!formData.status) {
      this.matSnackBar.open('ERROR: Status is required.');
      return false;
    }

    if (!formData.unit) {
      this.matSnackBar.open('ERROR: Unit is required.');
      return false;
    }

    if (!formData.acceptableLimit) {
      this.matSnackBar.open('ERROR: Limit is required.');
      return false;
    }

    if (formData.acceptableLimit && !this.formValidationService.getValidNumber(formData.acceptableLimit)) {
      this.matSnackBar.open('ERROR: Limit is not valid.');
      return false;
    }

    return true;
  }

  resetAddItemForm() {
    this.currentItem = {
      name: {}
    };
  }


  list() {
    this.manualUsageService.list().subscribe((records: IRawManualUsageListItem[]) => {
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

  resetAddUsageForm() {
    this.usageQuantity = '';
    this.currentItem = {
      name: {}
    };
  }

  load(stockManualItemId: number) {
    this.manualUsageService.view(stockManualItemId)
      .subscribe((record: IRawManualUsageListItem) => {
        this.currentItem = record;
      }, error => {
        console.error(error);
        this.matSnackBar.open('ERROR: View failed.');
      });
  }

  resetEditForm() {
    this.currentItem = undefined;
  }

  addUsageDialog(itemId: number) {
    const identifier: IStockListItemIdentifier = {
      item_id: itemId,
      usage_type: 'Manual',
      is_correcting: false
    };
    this.matDialog.open(AddCorrectDialogComponent, {
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
      width: '800px',
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
