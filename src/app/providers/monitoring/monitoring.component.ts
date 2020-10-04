import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProvidersService} from '../providers.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.styl']
})
export class MonitoringComponent implements OnInit {

  @Input() ttProvider: string;
  @Output() loadOrderEvent = new EventEmitter<number>();

  public records = [];

  public chosenRecord = undefined;

  constructor(private providerService: ProvidersService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.scheduleFetch();
  }

  private fetch() {
    this.providerService.list(this.ttProvider)
      .subscribe(records => {
        this.records = records;
      }, error => {
        console.error(error);
        this.matSnackBar.open('ERROR: Failed to fetch monitoring information.');
      });
  }

  private scheduleFetch() {
    setInterval(() => {
      this.fetch();
    }, 4000);
  }

  reset() {
    this.records = [];
    this.chosenRecord = undefined;
  }

  getDuration(startDate): string {
    return Math.round((((new Date()).getTime() - (new Date(startDate)).getTime()) / 1000) / 60) + ' min';
  }

  initLoadOrder(providerOrderId: number) {
    this.loadOrderEvent.emit(providerOrderId);
    this.chosenRecord = undefined;
  }
}
