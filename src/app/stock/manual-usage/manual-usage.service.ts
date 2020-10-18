import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {IManualUsageListItem, IStockManualLog} from '../stock.types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManualUsageService {

  constructor(private httpService: HttpService) {
  }

  store(formData: IManualUsageListItem): Observable<void> {
    return this.httpService.post('server/stock/manual-usage', formData);
  }

  list(): Observable<IManualUsageListItem[]> {
    return this.httpService.get('server/stock/manual-usage');
  }

  public view(stockManualItemId: number): Observable<IManualUsageListItem> {
    return this.httpService.get(`server/stock/manual-usage/${stockManualItemId}`);
  }

  public update(currentItem: IManualUsageListItem): Observable<void> {
    return this.httpService
      .put('server/stock/manual-usage/usage', currentItem);
  }

  addUsage(formData: IStockManualLog): Observable<void> {
    return this.httpService
      .post('server/stock/manual-usage/usage', formData);
  }
}
