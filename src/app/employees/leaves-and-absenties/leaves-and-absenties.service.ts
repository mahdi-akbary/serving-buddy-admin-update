import {Injectable} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeavesAndAbsentiesService {
  url: string = 'server/employees/leavesAndAbsenties';

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

  indexLeavesAndAbsenties(options?: {}): Observable<any> {
    return this.httpService.get(this.url + '/days', {params: options});
  }

  destroyLeavesAndAbsenties(id: number): Observable<any> {
    return this.httpService.delete(`${this.url}/days/${id}`);
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
