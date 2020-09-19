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

  get(id: number, options?: {}): Observable<ITable> {
    return this.httpService.get(this.url + `/${id}`, options);
  }
}



interface  IRawTable {
  id: number;
  order_id: number;
  orders_count: number;
}

export interface  ITable {
  id: number;
  orderId: number;
  ordersCount: number;
}

interface  IRawTableMinimal {
  id: number;
  status: string;
  last_update_datetime: Date;
  last_updated_by_name: string;
  last_updated_by_id: number;
}

export interface  ITableMinimal {
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
