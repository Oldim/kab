
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';

//--------------------------------------------------------
// NODIG VOOR POST SUCCESVOL NAAR DATABASE TE KRIJGEN 
//--------------------------------------------------------
import { HttpHeaders } from '@angular/common/http';
import { Score } from '../minesweeper/model/mijnenvegerTS';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'

    })
};

//--------------------------------------------------------
// SERVICE: 
//--------------------------------------------------------
@Injectable()
export class ScoreService {
    constructor(private http: HttpClient) { }

    addScore(score: Score) {
        return this.http.post<any>('http://127.0.0.1:1337/minesweeper', score, httpOptions);
    }
}