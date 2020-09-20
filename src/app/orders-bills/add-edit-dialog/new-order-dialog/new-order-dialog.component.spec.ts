import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderDialogComponent } from './new-order-dialog.component';

describe('NewOrderDialogComponent', () => {
  let component: NewOrderDialogComponent;
  let fixture: ComponentFixture<NewOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
