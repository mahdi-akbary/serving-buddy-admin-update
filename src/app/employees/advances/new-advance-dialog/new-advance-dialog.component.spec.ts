import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTableDialogComponent } from './new-customer-dialog.component';

describe('NewCustomerDialogComponent', () => {
  let component: NewTableDialogComponent;
  let fixture: ComponentFixture<NewTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTableDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
