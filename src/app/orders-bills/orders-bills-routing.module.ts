import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HistoryComponent} from "./history/history.component";
import {TablesComponent} from "./tables/tables.component";
import {MenuCategoriesComponent} from "./menu-categories/menu-categories.component";
import {MenuItemsComponent} from "./menu-items/menu-items.component";
import {OrdersBillsComponent} from "./orders-bills.component";

const routes: Routes = [
  {
    path: '',
    component: OrdersBillsComponent,
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'tables',
    component: TablesComponent
  },
  {
    path: 'menu-categories',
    component: MenuItemsComponent
  },
  {
    path: 'menu-items',
    component: MenuCategoriesComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersBillsRoutingModule {
}
