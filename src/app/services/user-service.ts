import {Injectable, signal} from '@angular/core';
import {environment} from '../../enviroments/enviroment';
import {AbstractHttpService} from './abstract-http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractHttpService {
  currentUser = signal<User | undefined>(undefined);

  getUser() : Observable<User> {
    const url = this.buildApiUrl(environment.api.GET_USER, {id: 2});
    return this.http.get<User>(url);
  }

}
