import {Injectable} from '@angular/core';
import {HttpService} from '../services/http.service';
import {IRawStockItemMinimal, IStockListItem, IStockItemMinimal, IStockManualLog} from './stock.types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpService: HttpService) {
  }

  list(): Observable<IStockListItem[]> {
    return this.httpService.get('server/stock');
  }

  listMinimal():Observable<IRawStockItemMinimal[]> {
    return this.httpService.get('server/stock/minimal');
  }

  public view(itemId: number, usageType: string): Observable<IStockManualLog> {
    return this.httpService.get(`server/stock/${itemId}/${usageType}`);
  }

  addQuantity(formData: IStockManualLog): Observable<void> {
    return this.httpService.patch('server/stock', formData);
  }

  correctQuantity(formData: IStockManualLog): Observable<void> {
    return this.httpService.patch('server/stock/correction', formData);
  }

}
