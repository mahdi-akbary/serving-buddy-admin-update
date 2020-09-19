import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersBillsRoutingModule} from './orders-bills-routing.module';
import {HistoryComponent} from './history/history.component';
import {TablesComponent} from './tables/tables.component';
import {MenuCategoriesComponent} from './menu-categories/menu-categories.component';
import {MenuItemsComponent} from './menu-items/menu-items.component';
import {OrdersBillsComponent} from "./orders-bills.component";
import {OrdersBillsService} from "./orders-bills.service";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

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
    OrdersBillsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [
    OrdersBillsService
  ]
})
export class OrdersBillsModule {
}
