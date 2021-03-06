import {Injectable} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  url: string = 'server/employees/payroll';

  constructor(private httpService: HttpService) {
  }

  index(options?: {}): Observable<any> {
    return this.httpService.get(this.url, {params: options});
  }

  View(options?: {}): Observable<any> {
    return this.httpService.get(this.url + '/view', {params: options});
  }

  store(data): Observable<any> {
    return this.httpService.post(this.url + '/execute', data);
  }

  update(data): Observable<any> {
    return this.httpService.get(this.url, data);
  }

  generateSelectYears(): string[] {
    let currentYear: number = (new Date()).getFullYear();
    let years: string[] = [];
    for (let i = 0; i < 5; i++) {
      years.push((currentYear - i) + "");
    }
    return years;
  }
}
