import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {environment as devEnvironment} from '../../environments/environment';
import {environment as prodEnvironment} from '../../environments/environment.prod';

@Injectable()
export class AuthService {
  user: IUser;
  env = devEnvironment || prodEnvironment;

  constructor(private httpService: HttpService) {
  }

  loginInDevelopmentMode() {
    if (!this.env.production) {
      this.httpService.post('login', {username: 'nikzad', password: '123456789'})
        .subscribe((user: IUser) => this.user = user)
    }
  }
}

interface IUser {
  id: number
  last_update_datetime: Date | any;
  last_updated_by: number
  name: string;
  status: string
  user_type: string
  username: string
}
