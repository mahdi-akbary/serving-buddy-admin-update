import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationsService} from '../notifications.service';
import {INotification} from '../notifications.types';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.styl']
})
export class ViewDialogComponent implements OnInit {

  data: INotification;

  constructor(public dialogRef: MatDialogRef<ViewDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public notificationId: number,
              private matSnackBar: MatSnackBar,
              private notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.notificationsService.getNotification(this.notificationId).subscribe((data: INotification) => {
      this.data = data;
    }, (error) => {
      this.matSnackBar.open('ERROR: could not load notification details');
      console.error('ERROR: could not load get notification details', error);
    });
  }

  changeStatus(status: string) {
    this.notificationsService.changeStatus(this.notificationId, status)
      .subscribe(() => {
        this.dialogRef.close();
      }, error => {
        this.matSnackBar.open('ERROR: Failed to update notification status.');
        console.error('ERROR: Failed to update notification status.', error);
      });
  }

}
