import { MinesweeperGrid } from "./MinesweeperGrid";


export class MinesweeperGame {
    private _grid: MinesweeperGrid;
    timer;
    private _seconden: number = 55;
    private _minuten: number = 0; 
    private _result: string;

    get seconden() {
        return this._seconden;
    }

    get minuten() {
        return this.minuten;
    }

    get grid(): MinesweeperGrid {
        return this._grid;
    }

    constructor() {
        this._grid = new MinesweeperGrid(10, 10, 10);
        this._seconden = 0;
    }

    start(): void {
        this._seconden = 0;
        this.timer = setInterval(() => { ++this._seconden; }, 1000);
    }

    stop(): void {
        clearInterval(this.timer);
        this.timer = null;
    }

    reset(): number {
        this._grid = new MinesweeperGrid(10, 10, 10);
        return this._seconden = 0;
    }
}  
 