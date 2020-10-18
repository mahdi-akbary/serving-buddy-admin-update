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

  show(id: number, options?: {}): Observable<IOrder> {
    return this.httpService.get(this.url + `/${id}`, options);
  }

  getOrdersSummary(tableId): Observable<any> {
    return this.httpService.get(`server/tables/${tableId}/orderSummaries`);
  }

  storeCustomer(data: ICustomer): Observable<any> {
    return this.httpService.post(this.url + `/addOrder`, data);
  }

  transfer(data): Observable<any> {
    return this.httpService.put(this.url + `/transfer`, data);
  }

  storeNewOrder(data): Observable<any> {
    return this.httpService.post(this.url + `/orderItem/add`, data);
  }

  updateOrder(data): Observable<any> {
    return this.httpService.put(this.url + `/orderItem`, data);
  }

  deleteOrder(orderId, orderItemId): Observable<any> {
    return this.httpService.delete(this.url + `/orderItem/${orderItemId}/${orderId}`);
  }

  gerCategories(): Observable<any> {
    return this.httpService.get(`server/categories/minimal`);
  }

  getItems(categoryId: number): Observable<any> {
    return this.httpService.get(`server/categories/${categoryId}/items/minimal`);
  }

  tableHistory(customerId: number): Observable<any> {
    return this.httpService.get(`server/tables/orderTableHistory/${customerId}`);
  }

  itemHistory(itemId: number): Observable<any> {
    return this.httpService.get(`server/items/${itemId}/history`);
  }

  updateInput(urlString: string, data): Observable<any> {
    return this.httpService.put(`${this.url}/${urlString}`, data);
  }

  checkout(data) {
    return this.httpService.put(`${this.url}/checkout`, data);
  }

  paymentHistory(orderId: number) {
    return this.httpService.get(`${this.url}/${orderId}/paymentCollectors`);
  }

  search(params) {
    return this.httpService.get(`${this.url}/history`, {params: params});
  }

  searchItems(params) {
    return this.httpService.get(`server/items/search`, {params: params});
  }

  storeItems(data) {
    return this.httpService.post(`server/items`, data);
  }

  updateItems(data) {
    return this.httpService.put(`server/items`, data);
  }

  tables() {
    return this.httpService.get(`server/tables/full`);
  }

  storeTable(data) {
    return this.httpService.post(`server/tables`, data);
  }

  updateTable(data) {
    return this.httpService.put(`server/tables`, data);
  }

  categories() {
    return this.httpService.get(`server/categories/full`);
  }

  storeCategories(data) {
    return this.httpService.post(`server/categories`, data);
  }

  updateCategories(data) {
    return this.httpService.put(`server/categories`, data);
  }
}

export interface IOrdersSummary {
  id: number;
  customer_name: string;
  init_order_datetime: Date;
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

export interface IOrder {
  id: number;
  lastTableId: number;
  grossTotal: number;
  totalPayments: number;
  discount: {
    amount: number,
    by: {
      id: number,
      name: string
    }
  };
  initialOrderBy: {
    id: number;
    name: string;
    datetime: Date;
  };
  lastUpdateBy: {
    id: number;
    name: string;
    datetime: Date;
  };
  initialDispatchDatetime: Date;
  lastDispatchDatetime: Date;
  checkedOutBy: {
    id: number;
    name: string;
    datetime: Date;
  };
  customerName: string;
  notes: string;
  miscellaneous: IMiscellaneousItem;
  items: IMenuItemOrdered[];
}

export interface IMiscellaneousItem {
  amount: number;
  notes: string;
}

export interface IMenuItemOrdered extends IMenuItemBase {
  orderId: number;
  orderItemId: number;
  count: number;
  notes?: string;
  display?: string;
  toEdit?: boolean;
  newlyInserted?: boolean;
}

interface IMenuItemBase {
  id: number;
  name: IName;
  price: number;
}

export interface IName {
  dari: string;
  english: string;
}

export interface IMenuCategoryMinimal {
  id: number;
  nameEnglish: string
}
