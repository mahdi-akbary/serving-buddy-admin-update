import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProvidersService} from '../providers.service';
import {IProviderListItem} from '../providers.types';
import {MatDialog} from '@angular/material/dialog';
import {ViewDialogComponent} from '../view-dialog/view-dialog.component';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.styl']
})
export class MonitoringComponent implements OnInit {

  @Input() ttProvider: string;

  public records: IProviderListItem[] = [];

  public chosenRecord = undefined;

  constructor(private providerService: ProvidersService,
              private matSnackBar: MatSnackBar,
              public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.providerService.list(this.ttProvider)
      .subscribe(records => {
        this.records = records;
      }, error => {
        console.error(error);
        this.matSnackBar.open('ERROR: Failed to fetch monitoring information.');
      });
  }

  reset() {
    this.records = [];
    this.chosenRecord = undefined;
  }

  getDuration(startDate): string {
    return Math.round((((new Date()).getTime() - (new Date(startDate)).getTime()) / 1000) / 60) + ' min';
  }

  viewDialog(providerOrderId) {
    console.log(this.chosenRecord, providerOrderId);
    this.matDialog.open(ViewDialogComponent, {
      width: '800px',
      data: providerOrderId,
      disableClose: true
    });
  }
}
