import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDialogComponent } from './add-edit-orders-dialog.component';

describe('AddEditOrdersDialogComponent', () => {
  let component: AddEditDialogComponent;
  let fixture: ComponentFixture<AddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
