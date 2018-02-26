// import { Square } from "../Interfaces/Square";
import { SquareState } from "./SquareState";

export class MinesweeperSquare //implements Square
{
    private state: SquareState;

    get State(): SquareState  
    {
        return this.state;
    }

    constructor(squareState: SquareState)
    {
        this.state = squareState;
    }

    triggerFlag(): SquareState 
    {
        if (this.state == SquareState.Clear || this.state == SquareState.Detonated)
            return this.state;

        return this.state == SquareState.Flag ? this.state = SquareState.Safe : this.state = SquareState.Flag;
    }

    clear(): SquareState {
        if (this.state == SquareState.Clear || this.state == SquareState.Flag || this.state == SquareState.Detonated)
            return this.state;

        if (this.state == SquareState.Safe)
            return this.state = SquareState.Clear;

        if (this.state == SquareState.Mine)
            return this.state = SquareState.Detonated;
    }
}