import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {LoginService} from './login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {
}
