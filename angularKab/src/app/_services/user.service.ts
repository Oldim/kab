import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';

//--------------------------------------------------------
// NODIG VOOR POST SUCCESVOL NAAR DATABASE TE KRIJGEN 
//--------------------------------------------------------
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
      
    })
  };

//--------------------------------------------------------
// SERVICE: Get all users  &  create user 
//--------------------------------------------------------
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('http://127.0.0.1:1337/user');
    }

  /*  getById(id: number) {
        return this.http.get('/api/users/' + id);
    } */

    create(user: User) {
        return this.http.post('http://127.0.0.1:1337/createUser', user, httpOptions);
    }
 /*
    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    } */
}