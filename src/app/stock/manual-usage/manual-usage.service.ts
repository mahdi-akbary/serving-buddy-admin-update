import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {IManualUsageListItem, IRawManualUsageListItem, IStockManualLog} from '../stock.types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManualUsageService {

  constructor(private httpService: HttpService) {
  }

  store(formData: IRawManualUsageListItem): Observable<void> {
    return this.httpService.post('server/stock/manual-usage', formData);
  }

  list(): Observable<IRawManualUsageListItem[]> {
    return this.httpService.get('server/stock/manual-usage');
  }

  public view(stockManualItemId: number): Observable<IRawManualUsageListItem> {
    return this.httpService.get(`server/stock/manual-usage/${stockManualItemId}`);
  }

  public update(currentItem: IRawManualUsageListItem): Observable<void> {
    return this.httpService
      .put('server/stock/manual-usage/usage', currentItem);
  }

  addUsage(formData: IStockManualLog): Observable<void> {
    return this.httpService
      .post('server/stock/manual-usage/usage', formData);
  }


}
