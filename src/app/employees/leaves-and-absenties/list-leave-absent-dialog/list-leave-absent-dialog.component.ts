import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormValidationService} from "../../../services/form-validation.service";
import {AuthService} from "../../../services/auth.service";
import {StaticDataService} from "../../../services/static-data.service";
import {LeavesAndAbsentiesService} from "../leaves-and-absenties.service";

@Component({
  selector: 'app-list-leave-absent-dialog',
  templateUrl: './list-leave-absent-dialog.component.html',
  styleUrls: ['./list-leave-absent-dialog.component.styl']
})
export class ListLeaveAbsentDialogComponent implements OnInit {
  leavesAndAbsentiesList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ListLeaveAbsentDialogComponent>,
    public formBuilder: FormBuilder,
    private leavesAndAbsentiesService: LeavesAndAbsentiesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.leavesAndAbsentiesService.indexLeavesAndAbsenties({
      employeeId: this.data.id,
      month: this.data.month,
      year: this.data.year
    })
      .subscribe(res => {
        this.leavesAndAbsentiesList = res.data
      })
  }

  delete(item) {
    this.leavesAndAbsentiesService.destroyLeavesAndAbsenties(item.id).subscribe((res) => {
      this.ngOnInit()
    }, (err) => {
    })
  }

  close() {
    this.dialogRef.close(true)
  }

}
