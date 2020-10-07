import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsRoutingModule} from './settings-routing.module';
import {UsersComponent} from './users/users.component';
import {UsersService} from './users/users.service';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ],
  providers: [
    UsersService
  ]
})
export class SettingsModule {
}
