import {NgModule} from '@angular/core';
import {NotificationsRoutingModule} from './notifications-routing.module';
import {NotificationsComponent} from './notifications.component';
import {SharedModule} from '../shared/shared.module';
import {NotificationsService} from './notifications.service';
import {ViewDialogComponent} from './view-dialog/view-dialog.component';


@NgModule({
  declarations: [
    NotificationsComponent,
    ViewDialogComponent
  ],
  imports: [
    SharedModule,
    NotificationsRoutingModule
  ],
  providers: [
    NotificationsService
  ]
})
export class NotificationsModule {
}
