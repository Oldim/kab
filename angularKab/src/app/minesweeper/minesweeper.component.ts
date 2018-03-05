import { Component, OnInit } from '@angular/core';
// import { MinesweeperGame } from './model/MineSweeperGame';
import { Bord } from './model/mijnenvegerTS';

@Component({
  selector: 'minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent implements OnInit {
  game: Bord;

  constructor() {

  }

  ngOnInit() {
    this.game = new Bord();
  }

  targetClick() {
   // console.dir(this.game.);
   console.dir(this.game.toString());
  }

  start() {
    event.preventDefault();
    alert("juu");
   // this.game.start();
  }

  stop() {
   // this.game.stop();
  }

  reset() {
   // this.game.reset();
  }

  

}
