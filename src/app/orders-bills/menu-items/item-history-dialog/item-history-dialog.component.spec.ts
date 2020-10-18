import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHistoryDialogComponent } from './table-history-dialog.component';

describe('TableHistoryDialogComponent', () => {
  let component: ItemHistoryDialogComponent;
  let fixture: ComponentFixture<ItemHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
