import { Component, OnInit } from '@angular/core';
import { Bord, Score } from '../model/mijnenvegerTS';
import { User } from '../../_models';
import { UserService } from '../../_services/index';
import { ScoreService } from '../../_services/scores.service';

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
  constructor(private userService: UserService, private scoreService: ScoreService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.dataFirstname = this.currentUser.firstName.toString();
    this.dataLastname = this.currentUser.lastName.toString();
    this.dataUsername = this.currentUser.username.toString();

  }



  sendStats() {

    this.dataFirstname = this.currentUser.firstName;
    this.dataLastname = this.currentUser.lastName;
    this.dataUsername = this.currentUser.username;
    this.dataTime = this.game.seconden;
    // console.dir(this.dataTime)
    let score = new Score(this.dataFirstname,this.dataLastname,this.dataUsername,this.dataTime);
    //let dataAllMinesweeper = [this.dataFirstname, this.dataLastname, this.dataUsername, this.dataTime];
    //console.dir(dataAllMinesweeper);
    alert("\nProficiat, " + this.dataUsername + "!\nJe bent niet ontploft!\n" + "Je deed er " + this.dataTime + " seconden over.\n\nJe gegevens worden verwerkt..");
    this.scoreService.addScore(score).subscribe(antw => alert(antw.message));

  }

  targetClick() {
    console.dir(this.game.toString());
  }

  start() {
    event.preventDefault();
    this.game = new Bord(this.rijen, this.kolommen, this.bommen);
  }

  reset() {
    this.game = new Bord(this.rijen, this.kolommen, this.bommen);
  }
}
