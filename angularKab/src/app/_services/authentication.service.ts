import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>('http://127.0.0.1:1337/authenticate', { username: username, password: password },
        { headers: new HttpHeaders({
            /**/ 'Content-Type':  'application/x-www-form-urlencoded',  
          })})
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user.body && user.body.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.body));
                }

                return user.body;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}