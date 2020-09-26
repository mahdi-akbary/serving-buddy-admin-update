import {Injectable} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Observable} from "rxjs";

@Injectable()
export class OrdersBillsService {
  url: string = 'server/orders'

  constructor(private httpService: HttpService) {
  }

  index(options?: {}): Observable<ITable[]> {
    return this.httpService.get(this.url, options);
  }

  show(id: number, options?: {}): Observable<ITable> {
    return this.httpService.get(this.url + `/${id}`, options);
  }
  getOrdersSummary(tableId): Observable<any>{
    return this.httpService.get( `server/tables/${tableId}/orderSummaries`);
  }

  storeCustomer(data: ICustomer): Observable<any> {
    return this.httpService.post(this.url + `/addOrder`, data);
  }

  transfer(data): Observable<any> {
    return this.httpService.put(this.url + `/transfer`, data);
  }
}

export interface IOrdersSummary {
  id:number;
  customer_name:string;
  init_order_datetime:Date;
}


export interface ICustomer {
  id?: number;
  tableId: number;
  customerName: string | any;
}


interface IRawTable {
  id: number;
  order_id: number;
  orders_count: number;
}

export interface ITable {
  id: number;
  order_id: number;
  orders_count: number;
}

interface IRawTableMinimal {
  id: number;
  status: string;
  last_update_datetime: Date;
  last_updated_by_name: string;
  last_updated_by_id: number;
}

export interface ITableMinimal {
  id: number;
  name: string;
  status: string;
  lastUpdate: {
    datetime: Date,
    by: {
      id: number,
      name: string
    }
  };
}
