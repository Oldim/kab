import { Component, OnInit } from '@angular/core';
import { Bord } from '../model/mijnenvegerTS';
import { User } from '../../_models';
import { UserService } from '../../_services/index';

@Component({
  selector: 'minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent implements OnInit {
  game: Bord;
  rijen: number = 10;
  kolommen: number = 10;
  bommen: number = 10;
  currentUser: User;
  dataUsername: string;
  dataLastname: string;
  dataFirstname: string;
  dataTime: number;
  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.dataFirstname = this.currentUser.firstName.toString();
    this.dataLastname = this.currentUser.lastName.toString();
    this.dataUsername = this.currentUser.username.toString();
  }

  sendStats() {
    alert(this.game.seconden);
    this.dataFirstname = this.currentUser.firstName;
    this.dataLastname = this.currentUser.lastName;
    this.dataUsername = this.currentUser.username;
    this.dataTime = this.game.seconden;
    let dataAllMinesweeper = [this.dataFirstname, this.dataLastname, this.dataUsername, this.dataTime];
    console.dir(dataAllMinesweeper);
  }
 
  targetClick() {
   console.dir(this.game.toString());
  }

  start() {
    event.preventDefault();
    this.game = new Bord(this.rijen,this.kolommen, this.bommen);
  }

  reset() {
    this.game = new Bord(this.rijen,this.kolommen, this.bommen);
  }
}
