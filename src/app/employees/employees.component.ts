import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmployeesService} from "./employees.service";
import {AddEditEmployeeDialogComponent} from "./add-edit-employee-dialog/add-edit-employee-dialog.component";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.styl']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeesService: EmployeesService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.employeesService.index().subscribe(res => {
      this.employees = res.data
    })
  }

  add() {
    const dialogRef = this.dialog.open(AddEditEmployeeDialogComponent, {
      width: '300px',
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      }
    });

  }

  update(employee) {
    const dialogRef = this.dialog.open(AddEditEmployeeDialogComponent, {
      width: '300px',
      data: employee,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      }
    });
  }
  view(employee) {
    const dialogRef = this.dialog.open(AddEditEmployeeDialogComponent, {
      width: '300px',
      data: {...employee, isViewMode: true},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      }
    });
  }

}
