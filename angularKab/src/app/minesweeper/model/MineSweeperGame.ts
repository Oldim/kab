// import { Game } from "../Interfaces/Game";
// import { Grid } from "../Interfaces/Grid";
import { MinesweeperGrid } from "./MinesweeperGrid"; 
// import { MinesweeperGameDifficulty } from "../Enums/MinesweeperGameDifficulty";

export class MinesweeperGame //implements Game 
{
    private _grid: MinesweeperGrid;

    get grid(): MinesweeperGrid
    {
        return this._grid;
    }

   constructor()
    {
        this._grid = new MinesweeperGrid(20,20,10);
    }
    // constructor(difficulty: MinesweeperGameDifficulty)
    // {
        
        // switch(difficulty)
        // {
        //     case MinesweeperGameDifficulty.Easy:
        //     {
        //         this.grid = new MinesweeperGrid(10, 10, 10);
        //         break;
        //     } 
        //     case MinesweeperGameDifficulty.Medium:
        //     {
        //         this.grid = new MinesweeperGrid(20, 20, 40);
        //         break;
        //     } 
        //     case MinesweeperGameDifficulty.Hard:
        //     {
        //         this.grid = new MinesweeperGrid(50, 50, 250);
        //         break;
        //     } 
        // }
    // }
}