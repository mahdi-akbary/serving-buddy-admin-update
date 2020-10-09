import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewElementComponent } from './view-element.component';

describe('ViewElementComponent', () => {
  let component: ViewElementComponent;
  let fixture: ComponentFixture<ViewElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
