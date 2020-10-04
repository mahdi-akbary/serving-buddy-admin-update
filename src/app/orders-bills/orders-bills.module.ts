import {NgModule} from '@angular/core';
import {OrdersBillsRoutingModule} from './orders-bills-routing.module';
import {HistoryComponent} from './history/history.component';
import {TablesComponent} from './tables/tables.component';
import {MenuCategoriesComponent} from './menu-categories/menu-categories.component';
import {MenuItemsComponent} from './menu-items/menu-items.component';
import {OrdersBillsComponent} from './orders-bills.component';
import {OrdersBillsService} from './orders-bills.service';
import {AddEditDialogComponent} from './add-edit-dialog/add-edit-dialog.component';
import {NewOrderDialogComponent} from './add-edit-dialog/new-order-dialog/new-order-dialog.component';
import {NewCustomerDialogComponent} from './add-edit-dialog/new-customer-dialog/new-customer-dialog.component';
import {TableHistoryDialogComponent} from './add-edit-dialog/table-history-dialog/table-history-dialog.component';
import {OrderDetailsDialogComponent} from './add-edit-dialog/order-details-dialog/order-details-dialog.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    OrdersBillsComponent,
    HistoryComponent,
    TablesComponent,
    MenuCategoriesComponent,
    MenuItemsComponent,
    AddEditDialogComponent,
    NewOrderDialogComponent,
    NewCustomerDialogComponent,
    TableHistoryDialogComponent,
    OrderDetailsDialogComponent
  ],
  imports: [
    SharedModule,
    OrdersBillsRoutingModule,
  ],
  providers: [
    OrdersBillsService
  ],
  entryComponents: []
})
export class OrdersBillsModule {
}
