import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersBillsComponent } from './orders-bills.component';

describe('OrdersBillsComponent', () => {
  let component: OrdersBillsComponent;
  let fixture: ComponentFixture<OrdersBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
