import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsDialogComponent } from './table-history-dialog.component';

describe('TableHistoryDialogComponent', () => {
  let component: OrderDetailsDialogComponent;
  let fixture: ComponentFixture<OrderDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
