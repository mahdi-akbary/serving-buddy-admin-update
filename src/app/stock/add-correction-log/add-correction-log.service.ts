import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAddCorrectionLog} from '../stock.types';

@Injectable({
  providedIn: 'root'
})
export class AddCorrectionLogService {
  constructor(private httpService: HttpService) {
  }

  search(parameters): Observable<IAddCorrectionLog[]> {
    let params = new HttpParams();
    for (let p in parameters) {
      params = params.append(p, parameters[p]);
    }

    return this.httpService
      .get('server/stock/add-correction-log', {
        params: params
      });
  }
}
