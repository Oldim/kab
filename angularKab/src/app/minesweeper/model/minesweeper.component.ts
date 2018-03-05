import { Component, OnInit } from '@angular/core';
import { Bord } from '../model/mijnenvegerTS';

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

  constructor() {

  }

  ngOnInit() {

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
