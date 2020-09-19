import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersBillsRoutingModule} from './orders-bills-routing.module';
import {HistoryComponent} from './history/history.component';
import {TablesComponent} from './tables/tables.component';
import {MenuCategoriesComponent} from './menu-categories/menu-categories.component';
import {MenuItemsComponent} from './menu-items/menu-items.component';
import {OrdersBillsComponent} from "./orders-bills.component";
import {OrdersBillsService} from "./orders-bills.service";


@NgModule({
  declarations: [
    OrdersBillsComponent,
    HistoryComponent,
    TablesComponent,
    MenuCategoriesComponent,
    MenuItemsComponent
  ],
  imports: [
    CommonModule,
    OrdersBillsRoutingModule
  ],
  providers: [
    OrdersBillsService
  ]
})
export class OrdersBillsModule {
}
