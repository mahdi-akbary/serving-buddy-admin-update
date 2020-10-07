import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInputDialogComponent } from './update-input-dialog.component';

describe('UpdateInputDialogComponent', () => {
  let component: UpdateInputDialogComponent;
  let fixture: ComponentFixture<UpdateInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInputDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
