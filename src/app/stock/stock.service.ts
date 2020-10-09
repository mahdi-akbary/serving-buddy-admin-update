import {Injectable} from '@angular/core';
import {HttpService} from '../services/http.service';
import {IRawStockItemMinimal, IRawStockListItem, IStockItemMinimal} from './stock.types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpService: HttpService) {
  }

  list(): Observable<IRawStockListItem[]> {
    return this.httpService.get('server/stock');
  }

  listMinimal() {
    return this.httpService
      .get('server/stock/minimal')
      .toPromise()
      .then(response => {
        return response.json().data || [];
      })
      .then(records => {
        return Promise.resolve(this.listMinimalConvert(records));
      });
  }

  private listMinimalConvert(rawRecords: IRawStockItemMinimal[]): IStockItemMinimal[] {

    let tempRecords: IStockItemMinimal[] = [];
    for (let i = 0; i < rawRecords.length; i++) {
      tempRecords[i] = <IStockItemMinimal>{
        itemId: `${rawRecords[i].item_id}~${rawRecords[i].usage_type}`,
        nameEnglish: rawRecords[i].name_english,
        usageType: rawRecords[i].usage_type
      };
    }

    return tempRecords;
  }

  public view(itemId: number, usageType: string): Observable<IRawStockListItem> {
    return this.httpService.get(`server/stock/${itemId}/${usageType}`);
  }

  store(formData: IRawStockListItem): Observable<void> {
    return this.httpService.patch('server/stock', formData);
  }

  update(formData: IRawStockListItem): Observable<void> {
    return this.httpService.patch('server/stock/correction', formData);
  }

}
