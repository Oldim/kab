// stap 3
// getScholen geeft Observable terug

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Observable => wijzigingen aan observable worden gemeld aan subscribers


// Injectable => client moet object niet zelf maken
@Injectable()
export class UserService {
     getUser(link):Observable<any[]> {
        return this.http.get<any[]>(link);
     }
 
     constructor(private http: HttpClient) {
     }
}