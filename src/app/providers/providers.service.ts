import {Injectable} from '@angular/core';
import {IProviderOrderItem, IProviderListItem, IProviderOrder} from './providers.types';
import {Observable} from 'rxjs';
import {HttpService} from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private httpService: HttpService) {
  }

  list(provider: string): Observable<IProviderListItem[]> {
    return this.httpService.get(`server/providers?provider=${provider}`);
  }

  getProviderOrder(id: number): Observable<IProviderOrder> {
    return this.httpService.get('server/providers/' + id);
  }

  getProviderOrderItems(id: number): Observable<IProviderOrderItem[]> {
    return this.httpService.get('server/providers/orderItem/' + id);
  }

}
