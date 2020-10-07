import {Injectable} from '@angular/core';
import {HttpService} from '../services/http.service';
import {
  IRawManualUsageListItem,
  IRawStockItemMinimal,
  IRawStockListItem,
  IStockItemMinimal,
  IStockListItem
} from './stock.types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpService: HttpService) {
  }

  list():Observable<IRawStockListItem[]> {
    return this.httpService.get('server/stock');
  }

  listMinimal() {
    return this.httpService
      .get('/server/stock/minimal')
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

  public view(itemId: string, usageType: string): Promise<IStockListItem> {
    return this.httpService
      .get(`/server/stock/${itemId.split('~')[0]}/${usageType}`)
      .toPromise()
      .then(response => {
        return response.json().data || {};
      })
      .then(record => {
        return Promise.resolve(this.viewConvert(record));
      });
  }

  private viewConvert(rawRecord: IRawStockListItem | IRawManualUsageListItem): IStockListItem {
    let id = (<IRawStockListItem>rawRecord).item_id || rawRecord.id;
    let usageType = (<IRawStockListItem>rawRecord).usage_type || 'Manual';
    return {
      id: rawRecord.id,
      item: {
        id: `${id}~${usageType}`,
        nameEnglish: (<IRawStockListItem>rawRecord).item_name_english || (<IRawManualUsageListItem>rawRecord).name_english,
        nameDari: (<IRawStockListItem>rawRecord).item_name_dari || (<IRawManualUsageListItem>rawRecord).name_dari
      },
      categoryNameEnglish: (<IRawStockListItem>rawRecord).category_name_english || 'NA',
      availableQuantity: rawRecord.available_quantity,
      usageType: (<IRawStockListItem>rawRecord).usage_type || 'Manual',
      unit: rawRecord.unit,
      notes: rawRecord.notes,
      lastUpdate: {
        datetime: rawRecord.last_update_datetime,
        by: {
          id: rawRecord.last_update_by_id,
          name: rawRecord.last_update_by_name
        }
      }
    };
  }

  addQuantitySubmit(formData: IStockListItem, quantityToUpdate: number): Promise<boolean> {
    return this.httpService
      .patch('server/stock', {
        itemId: formData.item.id.split('~')[0],
        quantityToUpdate: quantityToUpdate,
        unit: formData.unit,
        notes: formData.notes,
        usageType: formData.usageType
      })
      .toPromise()
      .then(response => {
        return response.json().data || {};
      })
      .then(() => {
        return Promise.resolve(true);
      })
      .catch(() => {
        return Promise.reject(false);
      });
  }

  correctQuantitySubmit(formData: IStockListItem, quantityToUpdate: number): Promise<boolean> {
    return this.httpService
      .patch('server/stock/correction', {
        itemId: formData.item.id.split('~')[0],
        quantityToUpdate: quantityToUpdate,
        notes: formData.notes,
        unit: formData.unit,
        usageType: formData.usageType
      })
      .toPromise()
      .then(response => {
        return response.json().data || {};
      })
      .then(() => {
        return Promise.resolve(true);
      })
      .catch(() => {
        return Promise.reject(false);
      });
  }

}
