import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//--------------------------------------------------------
// NODIG VOOR POST SUCCESVOL NAAR DATABASE TE KRIJGEN 
//--------------------------------------------------------
import { HttpHeaders } from '@angular/common/http';
import { TasksComponent, Category } from './tasks.component';
import { User } from '../_models';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'

    })
};

//--------------------------------------------------------
// SERVICE: create category
//--------------------------------------------------------
@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) { }

    //---------------------
    // CREATE CATEGORY 
    //---------------------
    create(category: Category) {
        console.dir(category);
        this.http.post<any>('http://127.0.0.1:1337/createCategory/', {cat_description: category.cat_description, ID: category.ID}, httpOptions
        ).subscribe(antw => {
            console.dir(antw);
            category.cat_id = antw.body.cat_id;
        },
            err => console.log(err.message));
    }
    //---------------------
    // UPDATE CATEGORY
    //---------------------
    edit(category: Category) {
        this.http.post<any>('http://127.0.0.1:1337/editCategory/', {cat_id: category.cat_id,cat_description: category.cat_description, ID: category.ID}, httpOptions
        ).subscribe(antw => {
            console.dir(antw);

        },
            err => console.log(err.message));
    }

    //---------------------
    // DELETE CATEGORY
    //---------------------
    delete(category: Category) {
        // let id = category.cat_id;
        console.log('delete()  cat.service.ts');
        console.log('category.cat_id: ', category.cat_id);
        console.log('category: ', category);

        this.http.delete('http://127.0.0.1:1337/deleteCategory/' + category.cat_id, httpOptions
        ).subscribe(antw => {
            console.dir(antw);
        },
            err => console.log(err.message));
    }

    //---------------------
    // GET ALL CATEGORIES
    //---------------------
    getAllCat(user: User): Observable<any[]> {
        return this.http.get<any[]>('http://127.0.0.1:1337/getAllCat/'+ user.id, httpOptions
        )//.subscribe -> task.components.ts
    }
}
