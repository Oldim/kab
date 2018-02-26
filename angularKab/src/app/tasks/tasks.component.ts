import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryService } from './category.service';


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
  cat: string;
  variable: string;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }


  createCategory() { // CLICK EVENT ADD CAT+ 
    this.createMap(this.cat);
    let category: Category = new Category();
    category.cat_description = this.cat;


    // SEND TO EXPRESS SERVER 
    console.log(category, httpOptions);

    this.categoryService.create(category);
    //this.http.post('http://127.0.0.1:1337/createCategory/', category, httpOptions);
  }

  createMap(x) { // ADD CAT-MAP IN DIV CAT
    this.variable = x;
  }
}


export class Category {
  cat_id: number;
  cat_description: string;
  ID: number;
  constructor() { }
}