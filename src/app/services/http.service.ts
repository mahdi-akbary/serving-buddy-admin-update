import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as devEnvironment, environment as prodEnvironment} from '../../environments/environment';
import {Observable} from "rxjs";

@Injectable()
export class HttpService {
  env = devEnvironment || prodEnvironment;
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = this.env.baseUrl.backend
  }

  post(url: string, data, options?: {}): Observable<any> {
    return this.http.post(this.baseUrl + url, data, options);
  }

  get(url: string, options?: {}): Observable<any> {
    return this.http.get(this.baseUrl + url, options);
  }

  delete(url: string, options?: {}): Observable<any> {
    return this.http.delete(this.baseUrl + url, options);
  }

  head(url: string, options?: {}): Observable<any> {
    return this.http.head(this.baseUrl + url, options);
  }

  put(url: string, data, options?: {}): Observable<any> {
    return this.http.put(this.baseUrl + url, data, options);
  }

  options(url: string, options?: {}): Observable<any> {
    return this.http.options(this.baseUrl + url, options);
  }

  patch(url: string, data, options?: {}): Observable<any> {
    return this.http.patch(this.baseUrl + url, data, options);
  }

  jsonp(url: string, options = ''): Observable<any> {
    return this.http.jsonp(this.baseUrl + url, options);
  }

  download(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url, {observe: 'response', responseType: 'blob'});
  }
}
