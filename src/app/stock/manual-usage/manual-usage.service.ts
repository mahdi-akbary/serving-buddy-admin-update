import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {IManualUsageListItem, IRawManualUsageListItem} from '../stock.types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManualUsageService {

  constructor(private httpService: HttpService) {
  }

  addItemSubmit(formData: IManualUsageListItem): Observable<any> {
    return this.httpService.post('server/stock/manual-usage', formData);
  }

  list(): Observable<any> {
    return this.httpService.get('server/stock/manual-usage');
  }

  private listConvert(rawRecords: IRawManualUsageListItem[]): IManualUsageListItem[] {

    let tempRecords: IManualUsageListItem[] = [];
    for (let i = 0; i < rawRecords.length; i++) {
      tempRecords[i] = this.viewConvert(rawRecords[i]);
    }

    return tempRecords;
  }

  private viewConvert(rawRecord: IRawManualUsageListItem): IManualUsageListItem {

    return {
      id: rawRecord.id,
      name: {
        english: rawRecord.name_english,
        dari: rawRecord.name_dari
      },
      availableQuantity: rawRecord.available_quantity,
      status: rawRecord.status,
      acceptableLimit: rawRecord.acceptable_limit,
      unit: rawRecord.unit,
      lastUpdate: {
        datetime: rawRecord.last_update_datetime,
        by: {
          id: rawRecord.last_update_by_id,
          name: rawRecord.last_update_by_name
        }
      },

    };
  }

  addUsageSubmit(formData: IManualUsageListItem, usageQuantity: number): Promise<boolean> {
    return this.httpService
      .post('server/stock/manual-usage/usage', {
        stockManualItemId: formData.id,
        unit: formData.unit,
        usageQuantity: usageQuantity,
        notes: formData.notes
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

  public view(stockManualItemId: number): Promise<IManualUsageListItem> {
    return this.httpService
      .get('server/stock/manual-usage/' + stockManualItemId)
      .toPromise()
      .then(response => {
        return response.json().data || {};
      })
      .then(record => {
        return Promise.resolve(this.viewConvert(record));
      });
  }

  public editItemSubmit(currentItem: IManualUsageListItem): Promise<boolean> {
    return this.httpService
      .put('server/stock/manual-usage/usage', currentItem)
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
