import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {AdvancesService} from "../advances.service";

@Component({
  selector: 'app-list-advance-dialog',
  templateUrl: './list-advance-dialog.component.html',
  styleUrls: ['./list-advance-dialog.component.styl']
})
export class ListAdvanceDialogComponent implements OnInit {
  leavesAndAbsentiesList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ListAdvanceDialogComponent>,
    public formBuilder: FormBuilder,
    private advancesService: AdvancesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.advancesService.indexAdvances({
      employeeId: this.data.id,
      month: this.data.month,
      year: this.data.year
    })
      .subscribe(res => {
        this.leavesAndAbsentiesList = res.data
      })
  }

  delete(item) {
    this.advancesService.destroyAdvances(item.id).subscribe((res) => {
      this.ngOnInit()
    }, (err) => {
    })
  }

  close() {
    this.dialogRef.close(true)
  }

}
