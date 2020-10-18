import {Injectable} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  url: string = 'server/employees';

  constructor(private httpService: HttpService) {
  }

  index(options?: {}): Observable<any> {
    return this.httpService.get(this.url, options);
  }
  storeEmployee(data): Observable<any> {
    return this.httpService.post(this.url, data);
  }
  updateEmployee(data): Observable<any> {
    return this.httpService.put(this.url, data);
  }
}
