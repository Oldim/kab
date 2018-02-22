import { Component, OnInit } from '@angular/core';
import { UserService } from './service';
import { User } from './user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  baseLink: string = 'http://localhost:1337/kab/user';
  surname: string;
  firstname: string;
  username: string;
  password: string;

  constructor(private userService: UserService) {
    
   }

  ngOnInit() {
    this.userService.getUser(this.baseLink).subscribe(
      data => {
        console.log(data);
      });
  }
 
  register(): void {
    console.log('register() func ok!');
    let chloe: User = new User(this.surname, this.firstname, this.username, this.password);
    console.log(chloe);
    
    
  }


}


//___________________________________________________________________________

// let wout: User = new User('Philipsen', 'Wout', 'Woutje', 'pasW1');


export class Users {
  allusers = [];
  constructor(public user:User){}
}

// let userzz:Users = new Users(wout);