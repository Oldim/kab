import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { CategoryService } from '../tasks/category.service';


@Component({
    moduleId: module.id.toString(),
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService, public categoryService: CategoryService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } 

    ngOnInit() {
        this.loadAllUsers();
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    // }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    getAllTasks(){
        let user = this.currentUser;
        this.categoryService.getAllCat(user); //.subscribe() ??
    }
}