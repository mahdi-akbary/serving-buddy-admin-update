import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IRawProviderOrder} from '../providers.types';
import {ProvidersService} from '../providers.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.styl']
})
export class ViewDialogComponent implements OnInit {
  currentProviderOrder: IRawProviderOrder = undefined;

  constructor(
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    private providersService: ProvidersService,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public providerOrderId: number) {
  }

  ngOnInit(): void {
    this.providersService
      .getProviderOrder(this.providerOrderId)
      .subscribe((providerOrder: IRawProviderOrder) => {
        this.currentProviderOrder = providerOrder;
      }, (error) => {
        this.matSnackBar.open('ERROR: Could not load order details.');
        console.error(error);
      });
  }

}
