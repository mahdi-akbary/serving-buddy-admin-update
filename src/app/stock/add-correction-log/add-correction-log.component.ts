import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StockService} from '../stock.service';
import {AddCorrectionLogService} from './add-correction-log.service';
import {IRawAddCorrectionLog, IRawStockItemMinimal} from '../stock.types';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormValidationService} from '../../services/form-validation.service';

@Component({
  selector: 'app-add-correction-log',
  templateUrl: './add-correction-log.component.html',
  styleUrls: ['./add-correction-log.component.styl']
})
export class AddCorrectionLogComponent implements OnInit {

  form: FormGroup;
  public generationDate: Date;

  public records: IRawAddCorrectionLog[] = [];

  public formData = {};
  public itemsMinimal: IRawStockItemMinimal[] = [];

  constructor(private addCorrectionLogService: AddCorrectionLogService,
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
        console.error('ERROR: Failed to load drop down list.', error);
      });
  }

  initForm() {
    this.form = this.formBuilder.group({
      start_datetime: [undefined, this.formValidationService.required.validator],
      end_datetime: [undefined, this.formValidationService.required.validator],
      item: [undefined],
    });
  }

  submit(formData) {
    this.addCorrectionLogService.search(formData)
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
