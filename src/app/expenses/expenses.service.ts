import {Injectable} from '@angular/core';
import {HttpService} from '../services/http.service';
import {IExpense} from './expenses.types';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private httpService: HttpService) {
  }

  search(parameters): Observable<IExpense[]> {
    let params = new HttpParams();
    for (let p in parameters) {
      params = params.append(p, parameters[p]);
    }

    return this.httpService
      .get('server/expenses', {
        params: params
      });
  }

  store(currentExpense): Observable<void> {
    return this.httpService.post('server/expenses', currentExpense);
  }

  view(expenseId: number): Observable<IExpense> {
    return this.httpService.get(`server/expenses/${expenseId}`);
  }

  update(formData: IExpense): Observable<void> {
    return this.httpService.put('server/expenses', formData);
  }
}
