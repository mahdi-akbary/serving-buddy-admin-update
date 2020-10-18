import {Component, OnInit} from '@angular/core';
import {IStockItemMinimal, IUsageLog} from '../stock.types';
import {UsageLogService} from './usage-log.service';
import {StockService} from '../stock.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormValidationService} from '../../services/form-validation.service';

@Component({
  selector: 'app-usage-log',
  templateUrl: './usage-log.component.html',
  styleUrls: ['./usage-log.component.styl']
})
export class UsageLogComponent implements OnInit {

  public form: FormGroup;
  public generationDate: Date;
  public records: IUsageLog[] = [];
  public formData = {};
  public itemsMinimal: IStockItemMinimal[] = [];

  constructor(private usageLogService: UsageLogService,
              private matSnackBar: MatSnackBar,
              private stockService: StockService,
              public formValidationService: FormValidationService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.stockService
      .listMinimal()
      .subscribe((items) => {
        this.itemsMinimal = items;
        this.initForm();
      }, (error) => {
        this.matSnackBar.open('ERROR: Failed to load drop down list.');
        console.log('ERROR: Failed to load drop down list.', error);
      });
  }

  initForm() {
    this.form = this.formBuilder.group({
      start_datetime: [undefined, this.formValidationService.required.validator],
      end_datetime: [undefined, this.formValidationService.required.validator],
      item: [undefined]
    });
  }

  submit(formData) {
    this.usageLogService.search(formData)
      .subscribe(records => {
        this.matSnackBar.open('OK: Search was successful.');
        this.records = records;
        this.generationDate = new Date();
      }, error => {
        this.matSnackBar.open('ERROR: Search failed.');
        console.error('ERROR: Search failed.', error);
      });
  }

  reset() {
    this.formData = {};
    this.records = [];
    this.form.reset();
  }

  public print() {
    window.print();
  }
}
