import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOrdersDialogComponent } from './add-edit-orders-dialog.component';

describe('AddEditOrdersDialogComponent', () => {
  let component: AddEditOrdersDialogComponent;
  let fixture: ComponentFixture<AddEditOrdersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOrdersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOrdersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
