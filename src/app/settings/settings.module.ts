import {NgModule} from '@angular/core';
import {SettingsRoutingModule} from './settings-routing.module';
import {UsersComponent} from './users/users.component';
import {UsersService} from './users/users.service';
import {SharedModule} from '../shared/shared.module';
import {AddEditDialogComponent} from './users/add-edit-dialog/add-edit-dialog.component';


@NgModule({
  declarations: [
    UsersComponent,
    AddEditDialogComponent
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule
  ],
  providers: [
    UsersService
  ]
})
export class SettingsModule {
}
