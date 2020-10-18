import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Observable} from 'rxjs';
import {IUser} from '../settings.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpService: HttpService) {
  }

  list(): Observable<IUser[]> {
    return this.httpService.get('server/users');
  }

  store(formData: IUser): Observable<void> {
    return this.httpService.post('server/users', formData);
  }

  view(userId: number): Observable<IUser> {
    return this.httpService.get(`server/users/${userId}`);
  }

  update(formData: IUser): Observable<void> {
    return this.httpService.put('server/users', formData);
  }

}
