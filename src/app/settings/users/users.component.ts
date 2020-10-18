import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from './users.service';
import {IUser} from '../settings.types';
import {MatDialog} from '@angular/material/dialog';
import {AddEditDialogComponent} from './add-edit-dialog/add-edit-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.styl']
})
export class UsersComponent implements OnInit {

  public chosenRecord = undefined;
  public records: IUser[] = [];

  constructor(private matSnackBar: MatSnackBar,
              private usersService: UsersService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.list();
  }

  public list() {
    this.usersService
      .list()
      .subscribe(records => {
        this.records = records;
      }, error => {
        this.matSnackBar.open('ERROR: could not load users');
        console.error('ERROR: could not load users', error);
      });
  }

  addEditDialog(userId?: number) {
    this.matDialog.open(AddEditDialogComponent, {
      width: '800px',
      disableClose: true,
      data: userId
    })
      .afterClosed()
      .subscribe(() => {
        this.reset();
        this.list();
      });
  }

  private reset() {
    this.records = [];
    this.chosenRecord = undefined;
  }
}
