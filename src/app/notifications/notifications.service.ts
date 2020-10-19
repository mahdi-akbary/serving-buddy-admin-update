import {Injectable} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Observable} from 'rxjs';
import {INotificationsInfo, INotification} from './notifications.types';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private httpService: HttpService) {
  }

  getNewNotificationsCount(): Observable<INotificationsInfo> {
    return this.httpService.get('/server/notifications/new/count');
  }

  search(parameters): Observable<INotification[]> {
    let params = new HttpParams();
    for (let p in parameters) {
      params = params.append(p, parameters[p]);
    }

    return this.httpService.get('server/notifications', {
      params: params
    });
  }

  getNotification(notificationId: number): Observable<INotification> {
    return this.httpService.get(`server/notifications/${notificationId}`);
  }

  changeStatus(notificationId: number, status: string): Observable<void> {
    return this.httpService.post('server/notifications/status', {
      notificationId: notificationId,
      status: status
    });
  }
}
