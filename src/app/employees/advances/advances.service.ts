import { Injectable } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {
  url: string = 'server/employees/advances';

  constructor(private httpService: HttpService) {
  }

  index(options?: {}): Observable<any> {
    return this.httpService.get(this.url, {params: options});
  }

  store(data): Observable<any> {
    return this.httpService.post(this.url, data);
  }

  update(data): Observable<any> {
    return this.httpService.get(this.url, data);
  }

  indexAdvances(options?: {}): Observable<any> {
    return this.httpService.get(this.url + '/advances', {params: options});
  }

  destroyAdvances(id: number): Observable<any> {
    return this.httpService.delete(`${this.url}/advances/${id}`);
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
