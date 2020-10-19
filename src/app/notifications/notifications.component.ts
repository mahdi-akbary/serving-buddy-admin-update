import {Component, OnInit} from '@angular/core';
import {INotification} from './notifications.types';
import {NotificationsService} from './notifications.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormValidationService} from '../services/form-validation.service';
import {environment} from '../../environments/environment';
import {ViewDialogComponent} from './view-dialog/view-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.styl']
})
export class NotificationsComponent implements OnInit {

  public form: FormGroup;
  public chosenRecord: number;
  public records = [];
  public formData = {};
  public generationDate;
  private currentNotification: INotification;

  constructor(private notificationService: NotificationsService,
              private matSnackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public formValidationService: FormValidationService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      start_datetime: [undefined, this.formValidationService.required.validator],
      end_datetime: [undefined, this.formValidationService.required.validator],
    });
  }

  public print() {
    window.print();
  }

  submit(formData) {
    this.notificationService.search(formData)
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
    this.chosenRecord = undefined;
    this.formData = {};
    this.records = [];
    this.form.reset();
  }

  load(notificationId: number) {
    this.notificationService
      .getNotification(notificationId)
      .subscribe((notification: INotification) => {
        this.currentNotification = notification;
        this.generationDate = new Date();
      }, error => {
        this.matSnackBar.open('ERROR: Failed to load notification.');
        console.error('ERROR: Failed to load notification.', error);
      });
  }

  printNotification(notificationId: number) {
    window.open(
      `${environment.baseUrl.backend}print/notification/${this.currentNotification.id}`,
      'Notification',
      'height=420,width=595'
    );
  }

  viewDialog(notificationId: number) {
    this.matDialog
      .open(ViewDialogComponent, {
        width: '600px',
        disableClose: true,
        data: notificationId
      })
      .afterClosed()
      .subscribe(() => {
        this.submit(this.form.value);
      });
  }
}
