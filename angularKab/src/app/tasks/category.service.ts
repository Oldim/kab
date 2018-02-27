import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//--------------------------------------------------------
// NODIG VOOR POST SUCCESVOL NAAR DATABASE TE KRIJGEN 
//--------------------------------------------------------
import { HttpHeaders } from '@angular/common/http';
import { TasksComponent, Category } from './tasks.component';
import { User } from '../_models';

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
        this.http.post('http://127.0.0.1:1337/createCategory/', category, httpOptions
        ).subscribe(antw => {
            console.dir(antw);
        },
            err => console.log(err.message));
    }

    //---------------------
    // DELETE CATEGORY
    //---------------------
    delete(category: Category) {             
        let id = category.cat_id;
        console.log('delete()  cat.service.ts');
        console.log('category.cat_id: ', category.cat_id);
        console.log('category: ', category);
        
        this.http.delete('http://127.0.0.1:1337/deleteCategory/:'+id+'', httpOptions
        ).subscribe(antw => {
            console.dir(antw);
        },
            err => console.log(err.message));
    }
}