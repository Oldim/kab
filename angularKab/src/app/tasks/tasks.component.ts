import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryService } from './category.service';
import { User } from '../_models';
import { UserService } from '../_services/index';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'

  })
};


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  title: string;
  currentUser: User;
  cat: string;
  cat_id: number;
  category: Category;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  //--------------------------------------------
  // ADDS CATEGORY TO DATABANK -> category.service.ts
  //--------------------------------------------
  createCategoryInDatabank(): void {
    // CREATE NEW CATEGORY
    let category: Category = new Category();
    // ADD DESCRIPTION TO OBJ
   
    category.cat_description = this.cat;
    category.ID = this.currentUser.id;
    
    // PUSH CATEGORY OBJ INTO ARRAY CATEGORIES
    this.categories.push(category);
    // SEND ALL TO CATEGORY.SERVICE.TS TO create()
    this.categoryService.create(category);
  }

  //--------------------------------------------
  // DELETE BUTTON OF CATEGORY TAB
  //--------------------------------------------
  deletebtn(obj): void {
    console.log(obj.cat_id);
    this.categoryService.delete(obj);
    this.categories.splice(this.categories.indexOf(obj),1);

    // for (let i = 0; i < this.categories.length; i++) {
    //   if (this.categories[i] == obj) {
    //     let pos = this.categories.indexOf(this.categories[i]);
    //     // SEND TO CATEGORY.SERVICE.TS TO delete()
    //    // console.log(this.categories[i]);
  
    //     this.categoryService.delete(this.categories[i]);
    //     this.categories.splice(pos, 1);
    //   }
    // }
    
  }

}


//********************************************************************************************/
// CLASSES 

export class Category {
  cat_id: number;
  cat_description: string;
  ID: number;
  constructor() { }
}

export class Subcat {
  subcat_id: number;
  cat_id: string;
  constructor() { }
}

export class Task {
  task_id: number;
  title: string;
  startdate: Date;
  enddate: Date;
  cat_id: number;
  constructor() { }
}