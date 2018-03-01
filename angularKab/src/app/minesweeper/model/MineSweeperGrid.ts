// import { Grid } from "../Interfaces/Grid";
// import { Square } from "../Interfaces/Square";
import { SquareState } from "./SquareState";
import { MinesweeperSquare } from "./MinesweeperSquare";

export class MinesweeperGrid// implements Grid 
{
    private width: number;
    private height: number;
    private squares: MinesweeperSquare[][];

    get Squares(): MinesweeperSquare[][] {
        return this.squares;
    }

    constructor(width: number, height: number, mines: number) { 
        if (width < 2 || height < 2)
            throw new Error("Minimum grid size is 2 x 2.");

        if (width * height < mines)
            throw new Error("Number of mines is larger than the grid size.");

        this.width = width;
        this.height = height;

        this.initialiseSquares(height);
        this.createSquares(width, height, mines, 0);
    }

    flagSquare(x: number, y: number): SquareState {
        return this.squares[x][y].triggerFlag();
    }

    clearSquare(x: number, y: number): void {
        console.log("clearSQUARE ",x," -",y)
        if (this.squares[x][y].clear() == SquareState.Detonated)
            throw Error("Game Over.");

        let surroundingMines = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                /**/
                if (x + i >= 0 && x + i < this.height && y+j >= 0 && y+j < this.width) {
                    /**/
                    if (this.squares[x + i][y + j].State == SquareState.Mine) {
                        surroundingMines++;
                        continue;
                    }
                }
            }
        }
 
        if (surroundingMines == 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                  /**/  if (x + i >= 0 && x + i < this.height && y+j >= 0 && y+j < this.width) {
                      if (this.squares[x + i][y + j].State == SquareState.Safe)
                        this.clearSquare(x + i, y + j);
                    }
                }
            }
        }
        else{
            console.log(surroundingMines)
        }
    }


    private initialiseSquares(height: number) {
        this.squares = [];

        for (let i = 0; i < height; i++)
            this.squares[i] = [];
    }
 

    // 
    //  WORKS: Creating 
    // 
    private createSquares(width: number, height: number, mines: number, minesCreated: number, recursive: boolean = false) {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (this.squares[i][j] == null || this.squares[i][j].State != SquareState.Mine) {
                    if (Math.random() < .1 && minesCreated < mines) {
                        this.squares[i][j] = new MinesweeperSquare(SquareState.Mine);
                        minesCreated++;
                        continue;
                    }

                    if (recursive && minesCreated == mines)
                        break;

                    this.squares[i][j] = new MinesweeperSquare(SquareState.Safe);
                }
            }
        }

        if (minesCreated < mines)
            this.createSquares(width, height, mines, minesCreated, true);
    }
} 