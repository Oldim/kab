import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryService } from './category.service';
import { SubCategoryService } from './subCategory.service';
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
  subCat: string = '';
  cat_id: number;
  category: Category;
  subCategory: Subcat;
  categories: Category[] = [];
  subCategories: Subcat[] = [];

  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllTasks();
  }

  //--------------------------------------------
  // ADDS CATEGORY TO DATABANK -> category.service.ts
  //--------------------------------------------
  createCategoryInDatabank(): void {
    let category: Category = new Category();
    category.cat_description = this.cat;
    category.ID = this.currentUser.id;
    this.categories.push(category);
    // SEND ALL TO CATEGORY.SERVICE.TS TO create()
    this.categoryService.create(category); 
    this.cat='';
  }

  //-------------------------------------------------------
  // ADDS Sub-CATEGORY TO DATABANK -> subCategory.service.ts
  //--------------------------------------------------------
  createSubCat(obj): void {
    let subCategory: Subcat = new Subcat();
    
    subCategory.subCat_description = this.subCat; 
    subCategory.cat_id = obj.cat_id;
    console.log(obj);
    this.subCategories.push(subCategory);
    this.subCategoryService.createSub(subCategory);
    this.subCat = '';
  }

  //--------------------------------------------
  // DELETE BUTTON OF CATEGORY TAB
  //--------------------------------------------
  deletebtn(obj): void {
    console.log(obj.cat_id);
    this.categoryService.delete(obj);
    this.categories.splice(this.categories.indexOf(obj), 1);
  }

  //--------------------------------------------
  // SAVE BUTTON UPDATE CATEGORY IN DATABASE
  //--------------------------------------------
  editTitle(object) {
    console.log("Auto change all data to object: update databank");
    // UPDATE DATABANK
    this.categoryService.edit(object);
  }

  //--------------------------------------------
  // GET ALL CATEGORIES OUT DATABASE oninit()
  //--------------------------------------------
  getAllTasks() {
    let user = this.currentUser;
    this.categoryService.getAllCat(user).subscribe(antw => {
      this.categories = [];
      for (let i = 0; i < antw.length; i++) {
        let category = new Category();
        category.ID = antw[i].id;
        category.cat_description = antw[i].description;
        category.cat_id = antw[i].cat_id;
        this.categories.push(category);
      }
    },
      err => console.log(err.message));
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
  subCat_description: string;
  cat_id: number;
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