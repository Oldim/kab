import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryService } from './category.service';
import { SubCategoryService } from './subCategory.service';
import { User } from '../_models';
import { UserService } from '../_services/index';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { TaskService } from './task.service';
import { DatePipe } from '@angular/common';


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
  task: string;
  taskText: string;
  title: string;
  currentUser: User;
  cat: string;
  subCat: string;
  cat_id: number;
  subcat_id: number;
  category: Category;
  subCategory: Subcat;
  categories: Category[] = [];   
  subCategories: Subcat[] = [];  // nakijken: overbodig ???
  headCategories: Category[] = [];
  allTasks: Task[] = [];
  allCatTasks: Task[] = [];
  allSubCatTasks: Task[] = [];
  currentSubcat: Subcat;

  constructor(private taskService: TaskService ,private categoryService: CategoryService, private subCategoryService: SubCategoryService, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllTasks();
  }
//**********************************************************************************************/
// CATEGORY  
//**********************************************************************************************/
  //--------------------------------------------
  // ADDS CATEGORY TO DATABANK -> category.service.ts
  //--------------------------------------------
  createCategoryInDatabank(): void {
    let category: Category = new Category();
    this.headCategories.push(category);
    category.cat_description = this.cat;
    category.ID = this.currentUser.id;
    this.categories.push(category);
    // SEND ALL TO CATEGORY.SERVICE.TS TO create()
    this.categoryService.create(category); 
    this.cat='';
  }
  
  //--------------------------------------------
  // DELETE BUTTON OF CATEGORY TAB
  //--------------------------------------------
  deletebtn(obj): void {
    this.categoryService.delete(obj);
    this.categories.splice(this.categories.indexOf(obj), 1);
    this.headCategories.splice(this.headCategories.indexOf(obj), 1);
    this.subCategories.splice(this.subCategories.indexOf(obj), 1);
  }

  //--------------------------------------------
  // SAVE BUTTON UPDATE CATEGORY IN DATABASE
  //--------------------------------------------
  editTitle(obj) {
    // UPDATE DATABANK
    this.categoryService.edit(obj);
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
        if (antw[i].scat_id == undefined){
          this.headCategories.push(category);
        }
      }
      this.vulSubcategories(antw);
      console.log("headCategories met subcategories in");
      console.dir(this.headCategories);

    },
      err => console.log(err.message));
  }
//**********************************************************************************************/
// SUB-CATEGORY  
//**********************************************************************************************/
  //-------------------------------------------------------
  // ADDS SUB-CATEGORY TO DATABANK -> subCategory.service.ts
  //--------------------------------------------------------
  createSubCat(obj): void {
    let tmp = obj.cat_description;
    let subCategory: Subcat = new Subcat();
    let newCat = new Category();
    subCategory.subcat_id= obj.cat_id; 
    subCategory.category = obj;
    /**/subCategory.category.cat_description= this.subCat;

    this.subCategories.push(subCategory);
    newCat.cat_description = this.subCat;
    newCat.ID = this.currentUser.id;
    obj.subcategories.push(newCat);
    this.subCategoryService.createSub(subCategory);
   
    this.currentSubcat = null;
    obj.cat_description = tmp;
    this.subCat = '';
  }

  //--------------------------------------------
  // VUL SUB-CATEGORY WITH 
  //--------------------------------------------
  vulSubcategories(rows: any){
    //console.dir(this.headCategories);
    for (let index = 0; index < this.headCategories.length; index++) {
        let tmpSubcat = rows.filter( row => row.scat_id == this.headCategories[index].cat_id );
      //  console.log("tmpsubcat");
      //  console.dir(tmpSubcat);
        for (let i = 0; i < tmpSubcat.length; i++) {
          let category = new Category();
          category.ID = rows[i].id;
          category.cat_description = rows[i].description;
          category.cat_id = rows[i].cat_id;
          this.headCategories[index].subcategories.push(category);
        }
    }
  }
//**********************************************************************************************/
// TASKS
//**********************************************************************************************/
  //--------------------------------------------
  // CREATE TASK
  //--------------------------------------------
  createTask(objtaak){
    let taak: Task= new Task();
    taak.title = this.task;
    taak.details = this.taskText;
    taak.cat_id = objtaak.cat_id;
    this.allTasks.push(taak);
    this.allCatTasks.push(taak);
  //  this.allSubCatTasks.push(taak);
    // SEND TASK TO TASK.SERVICE.TS TO create()
    this.taskService.createTask(taak);
    console.log("send to taskService taak: ", taak);
    // this.taak='';
  }

  //--------------------------------------------
  // EDIT TASK
  //--------------------------------------------



  
  //--------------------------------------------
  // DELETE TASK
  //--------------------------------------------
 deleteTaak(obj): void {
    this.taskService.delete(obj);
    this.allTasks.splice(this.allTasks.indexOf(obj), 1);
    this.allCatTasks.splice(this.allCatTasks.indexOf(obj), 1);
   // this.allSubCatTasks.splice(this.allCatTasks.indexOf(obj), 1);
  }


}








//********************************************************************************************/
// CLASSES 
//********************************************************************************************/

export class Category {
  cat_id: number;
  cat_description: string;
  ID: number;
  constructor() { }

  /**/
  subcategories: Category[] = []; // Cat heeft array met Subcats 
}

export class Subcat {
  subcat_id: number;
 // subCat_description: string;
  cat_id: number;
  category: Category;
  constructor() { }
}

export class Task {
  task_id: number;
  title: string;
  details: string
 // startdate: Date;
 // enddate: Date;
  cat_id: number;
  constructor() { }
}