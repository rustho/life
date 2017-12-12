import binding from "./binding";
import EventEmiter from "./EventEmiter";
import {IModel} from "./types/IModel";

import * as config from "./config/config.json";

export default class Model extends EventEmiter  implements IModel {
    private width: number;
    private height: number;
    private board: number[][];
    private CELL_SQUARE: number;

    constructor() {
        super();
        this.CELL_SQUARE = (config).CELL_SQUARE;
        this.width = 20;
        this.height = 20;
        this.board = this.newBoard();
        binding(this);
    }
    public findCellAndChange(x: number, y: number): void {
        const xCell = Math.floor(x / this.CELL_SQUARE);
        const yCell = Math.floor(y / this.CELL_SQUARE);
        if (this.board[yCell][xCell] === 0) {
            this.board[yCell][xCell] = 1;
        } else {
            this.board[yCell][xCell] = 0;
        }
        this.emit("changeStateBoard", this.board);
    }
    public changeStateOfCell(i: number, j: number): number {
        let livingcell = 0;
        const arrayOfBorderY: number[] = [ i - 1, i , i + 1 ];
        const arrayOfBorderX: number[] = [ j - 1, j , j + 1 ];
        let res = 0;
        arrayOfBorderY.forEach((indexOfRow, row) => {
            arrayOfBorderX.forEach((indexOfColl, coll) => {
                // проверка для моделирования поверхности тора
                indexOfRow = (indexOfRow === -1) ? this.height - 1 : indexOfRow;
                indexOfColl = (indexOfColl === -1) ? this.width - 1 : indexOfColl;
                indexOfRow = (indexOfRow === this.height) ?  0 : indexOfRow;
                indexOfColl = (indexOfColl === this.width) ? 0 : indexOfColl;
                if (this.board[indexOfRow][indexOfColl] === 1) {
                    livingcell += 1;
                }
            });
        });
        if (livingcell === 3 || (this.board[i][j] === 1 && livingcell === 4)) {
            res = 1;
        }
        return res;
    }
    public nextState(): void {
        const newboard = this.newBoard();
        newboard.forEach((row, indexOfRow) => {
            newboard[indexOfRow].forEach((element, indexOfColl) => {
                newboard[indexOfRow][indexOfColl] = this.changeStateOfCell(indexOfRow, indexOfColl);
            });
        });
        this.board = newboard;
        this.emit("changeStateBoard", this.board);
    }
    public clearBoard(): void {
        this.board = this.newBoard();
        this.emit("changeStateBoard", this.board);
    }
    public changeQuantityCell(width: number, height: number): void {
        this.width = Math.floor(width / this.CELL_SQUARE);
        this.height = Math.floor(height / this.CELL_SQUARE);
        this.board = this.newBoard();
        this.emit("changeStateBoard", this.board);
    }
    public newBoard(): number[][] {
        const board = [];
        for (let i = 0; i < this.height; i++) {
            board[i] = [];
            for (let j = 0; j < this.width; j++) {
                board[i][j] = 0;
            }
        }
        return board;
    }
    public getBoard(): number[][] {
        return this.board;
    }
    public set setBoard(someBoard: number[][]) {
        this.board = someBoard;
        this.height = someBoard.length;
        this.width = someBoard[0].length;
    }
}
