import { Component, OnInit } from '@angular/core';
import { MinesweeperGame } from './model/MineSweeperGame';

@Component({
  selector: 'minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent implements OnInit {
  game: MinesweeperGame;

  constructor() {
   
   }

  ngOnInit() {
    this.game = new MinesweeperGame();
  }

  targetClick() {
    console.dir(this.game.grid);
  }


}
