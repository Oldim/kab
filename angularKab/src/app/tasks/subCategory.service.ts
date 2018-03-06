import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//--------------------------------------------------------
// NODIG VOOR POST SUCCESVOL NAAR DATABASE TE KRIJGEN 
//--------------------------------------------------------
import { HttpHeaders } from '@angular/common/http';
import { TasksComponent, Category, Subcat  } from './tasks.component';
import { User } from '../_models';
import {CategoryService } from './category.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'

    })
};

//--------------------------------------------------------
// SERVICE: create category
//--------------------------------------------------------
@Injectable()
export class SubCategoryService {
    constructor(private http: HttpClient) { }

    //---------------------
    // UPDATE CATEGORY
    //---------------------
    // edit(category: Category) {
    //     this.http.post<any>('http://127.0.0.1:1337/editCategory/', category, httpOptions
    //     ).subscribe(antw => {
    //         console.dir(antw);

    //     },
    //         err => console.log(err.message));
    // }

    //---------------------
    // DELETE CATEGORY
    //---------------------
    // delete(category: Category) {             
    //    // let id = category.cat_id;
    //     console.log('delete()  cat.service.ts');
    //     console.log('category.cat_id: ', category.cat_id);
    //     console.log('category: ', category);
        
    //    this.http.delete('http://127.0.0.1:1337/deleteCategory/'+ category.cat_id, httpOptions
    //     ).subscribe(antw => {
    //         console.dir(antw);
    //     },
    //         err => console.log(err.message));
    // }
     //---------------------
    // CREATE Sub- CATEGORY 
    //---------------------
    createSub(subCategory: Subcat) {
        console.log("subcatservice:",subCategory);
        console.dir(  {subcat_id: subCategory.category.cat_id, subCategory: subCategory.category.cat_description });
        this.http.post<any>('http://127.0.0.1:1337/createSubCategory/',  {subcat_id: subCategory.category.cat_id, cat_description: subCategory.category.cat_description, 
    ID: subCategory.category.ID }, httpOptions
        ).subscribe(antw => {
            console.log("test------------");
           // console.dir(antw);
            subCategory.subcat_id = antw.subcat_id;
        },
            err => console.log(err.message));
    }
}