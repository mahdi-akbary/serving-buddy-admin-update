import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryDialogComponent } from './table-history-dialog.component';

describe('TableHistoryDialogComponent', () => {
  let component: PaymentHistoryDialogComponent;
  let fixture: ComponentFixture<PaymentHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
