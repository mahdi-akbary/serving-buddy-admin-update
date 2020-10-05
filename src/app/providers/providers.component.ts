import {Component, OnInit} from '@angular/core';
import {StaticDataService} from '../services/static-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProvidersService} from './providers.service';
import {IRawProviderOrder} from './providers.types';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.styl']
})
export class ProvidersComponent implements OnInit {

  private providers: string[];
  public currentProviderOrder: IRawProviderOrder;

  constructor(private staticDataService: StaticDataService,
              private providerService: ProvidersService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.providers = this.staticDataService.toMonitorProviders;
  }

}
