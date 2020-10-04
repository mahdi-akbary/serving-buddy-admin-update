import {Injectable} from '@angular/core';
import {IRawProviderListItem, IRawProviderOrder} from './providers.types';
import {Observable} from 'rxjs';
import {HttpService} from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private httpService: HttpService) {
  }

  list(provider: string): Observable<IRawProviderListItem[]> {
    return this.httpService.get(`server/providers?provider=${provider}`);
  }

  getProviderOrder(id: number): Observable<IRawProviderOrder> {
    return this.httpService.get('server/providers/' + id);
  }

}
