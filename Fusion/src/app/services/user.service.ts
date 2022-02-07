import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../shared/user';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private processHTTPMsgService:ProcessHTTPMsgService) { }
    user:User;

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(baseURL + 'users')
          .pipe(catchError(this.processHTTPMsgService.handleError));
      }
}