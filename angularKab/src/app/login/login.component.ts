import { Component, OnInit } from '@angular/core';
import { UserService } from './service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseLink: string = 'http://localhost:1337/kab/user'
  constructor(private userService: UserService) {
    
   }

  ngOnInit() {
    this.userService.getUser(this.baseLink).subscribe(
      data => {
        console.log(data);
      });
  }

}
