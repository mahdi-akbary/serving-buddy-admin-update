import {NgModule} from '@angular/core';
import {ProvidersRoutingModule} from './providers-routing.module';
import {ProvidersComponent} from './providers.component';
import {MonitoringComponent} from './monitoring/monitoring.component';
import {ProvidersService} from './providers.service';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ProvidersComponent,
    MonitoringComponent
  ],
  imports: [
    SharedModule,
    ProvidersRoutingModule,
  ],
  providers: [
    ProvidersService
  ]
})
export class ProvidersModule {
}
