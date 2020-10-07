import {Injectable} from '@angular/core';
import {HttpService} from '../services/http.service';
import {IExpense, IRawExpense} from './expenses.types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private httpService: HttpService) {
  }

  search(parameters) {
    let params = new URLSearchParams();
    for (let p in parameters) {
      params.set(p, parameters[p]);
    }

    return this.httpService
      .get('/server/expenses', {
        search: params
      })
      .toPromise()
      .then(response => {
        return response.json().data || [];
      })
      .then(records=> {
        return Promise.resolve(this.searchConvert(records));
      });
  }

  private searchConvert(rawRecords: IRawExpense[]): IExpense[] {

    let tempRecords: IExpense[] = [];
    for (let i = 0; i < rawRecords.length; i++) {
      tempRecords[i] = {
        id: rawRecords[i].id,
        amount: rawRecords[i].amount,
        description: rawRecords[i].description,
        datetime: rawRecords[i].datetime,
        lastUpdate: {
          datetime: rawRecords[i].last_update_datetime,
          by: {
            id: rawRecords[i].last_update_by_id,
            name: rawRecords[i].last_update_by_name
          }
        }
      };
    }

    return tempRecords;
  }

  store(currentExpense): Observable<void> {
    return this.httpService.post('server/expenses', currentExpense);
  }

  getExpense(expenseId: number): Observable<IRawExpense> {
    return this.httpService.get(`server/expenses/${expenseId}`);
  }

  editSubmit(formData: IExpense): Observable<void> {
    return this.httpService.put('server/expenses', formData);
  }
}
