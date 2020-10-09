import {NgModule} from '@angular/core';
import {SettingsRoutingModule} from './settings-routing.module';
import {UsersComponent} from './users/users.component';
import {UsersService} from './users/users.service';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent
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
