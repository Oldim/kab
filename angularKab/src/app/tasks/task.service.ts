import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//--------------------------------------------------------
// NODIG VOOR POST SUCCESVOL NAAR DATABASE TE KRIJGEN 
//--------------------------------------------------------
import { HttpHeaders } from '@angular/common/http';
import { TasksComponent, Category, Subcat, Task  } from './tasks.component';
import { User } from '../_models';
import {CategoryService } from './category.service';
import { SubCategoryService } from './subCategory.service';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'

    })
};

//--------------------------------------------------------
// SERVICE: create task
//--------------------------------------------------------
@Injectable()
export class TaskService {
    constructor(private http: HttpClient) { }

    //---------------------
    // UPDATE TASK
    //---------------------
    // edit(category: Category) {
    //     this.http.post<any>('http://127.0.0.1:1337/editCategory/', category, httpOptions
    //     ).subscribe(antw => {
    //         console.dir(antw);

    //     },
    //         err => console.log(err.message));
    // }

    //---------------------
    // DELETE TASK
    //---------------------
    delete(task: Task) {             
        console.log('delete() task.service.ts');
        console.dir(task);
        
       this.http.delete('http://127.0.0.1:1337/deleteTask/' + task.task_id, httpOptions
        ).subscribe(antw => {
            console.log('del antw: ',antw);
            console.dir(antw);
        },
            err => console.log("ERROR MSG: ", err.message));
    }

     //---------------------
    // CREATE TASK 
    //---------------------
    createTask(task: Task) {
        console.log("createtask() task:",task);
    
        this.http.post<any>('http://127.0.0.1:1337/createTask/', {title: task.title, details: task.details, cat_id: task.cat_id}, httpOptions
        ).subscribe(antw => {
            console.log("task post() complete");
            // ANTW NODIG VOOR TAAK ID TE WETEN VAN DATABASe
                console.log("subscribe() => antw:", antw);
                task.task_id = antw.body.task_id;
        },
            err => console.log(err.message));
    }
}