import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {HttpParams} from '@angular/common/http';
import {IRawUsageLog} from '../stock.types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsageLogService {

  constructor(private httpService: HttpService) {
  }

  search(parameters): Observable<IRawUsageLog[]> {
    let params = new HttpParams();
    for (let p in parameters) {
      params = params.append(p, parameters[p]);
    }

    return this.httpService.get('server/stock/usage-log', {
      params: params
    });
  }
}
