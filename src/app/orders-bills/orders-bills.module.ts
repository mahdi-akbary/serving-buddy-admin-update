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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { NewOrderDialogComponent } from './add-edit-dialog/new-order-dialog/new-order-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {NewCustomerDialogComponent} from "./add-edit-dialog/new-customer-dialog/new-customer-dialog.component";
@NgModule({
  declarations: [
    OrdersBillsComponent,
    HistoryComponent,
    TablesComponent,
    MenuCategoriesComponent,
    MenuItemsComponent,
    AddEditDialogComponent,
    NewOrderDialogComponent,
    NewCustomerDialogComponent
  ],
  imports: [
    CommonModule,
    OrdersBillsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [
    OrdersBillsService
  ],
  entryComponents: []
})
export class OrdersBillsModule {
}
