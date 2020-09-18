import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOptionsComponent } from './list-options.component';

describe('ListOptionsComponent', () => {
  let component: ListOptionsComponent;
  let fixture: ComponentFixture<ListOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
