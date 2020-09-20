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
import {AddEditDialogComponent} from './add-edit-dialog/add-edit-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    OrdersBillsComponent,
    HistoryComponent,
    TablesComponent,
    MenuCategoriesComponent,
    MenuItemsComponent,
    AddEditDialogComponent
  ],
  imports: [
    CommonModule,
    OrdersBillsRoutingModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    OrdersBillsService
  ],
  entryComponents: []
})
export class OrdersBillsModule {
}
