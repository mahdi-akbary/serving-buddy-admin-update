import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategoriesComponent } from './menu-categories.component';

describe('MenuCategoriesComponent', () => {
  let component: MenuCategoriesComponent;
  let fixture: ComponentFixture<MenuCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
