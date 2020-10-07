import {NgModule} from '@angular/core';
import {NotificationsRoutingModule} from './notifications-routing.module';
import {NotificationsComponent} from './notifications.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    SharedModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule {
}
