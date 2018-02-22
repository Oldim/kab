import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('http://127.0.0.1:1337/kab/user');
    }

  /*  getById(id: number) {
        return this.http.get('/api/users/' + id);
    } */

    create(user: User) {
        return this.http.post('http://127.0.0.1:1337/kab/createUser', user);
    }
 /*
    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    } */
}