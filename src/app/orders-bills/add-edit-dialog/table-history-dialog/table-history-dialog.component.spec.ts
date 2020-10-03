import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistoryDialogComponent } from './table-history-dialog.component';

describe('TableHistoryDialogComponent', () => {
  let component: TableHistoryDialogComponent;
  let fixture: ComponentFixture<TableHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
