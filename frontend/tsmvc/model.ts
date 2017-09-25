import binding from "./binding";
import EventEmiter from "./EventEmiter";
export default class {
    public eventEmiter: EventEmiter;
    private width: number;
    private height: number;
    private board: number[][];
    private CELL_SQUARE: number;

    constructor() {
        this.CELL_SQUARE = 20;
        this.eventEmiter = new EventEmiter();
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
        this.eventEmiter.emit("changeStateBoard", {board: this.board});
    }
    public changeStateOfCell(i: number, j: number): number {
        let livingcell = 0;
        for (let il = i - 1; il <= i + 1; il++) {
            for (let jl = j - 1; jl <= j + 1; jl++) {
                let ii = il;
                let jj = jl; // проверка для моделирования поверхности тора
                ii = (il === -1) ? this.height - 1 : ii;
                jj = (jl === -1) ? this.width - 1 : jj;
                ii = (il === this.height) ?  0 : ii;
                jj = (jl === this.width) ? 0 : jj;
                if (this.board[ii][jj] === 1) {
                    livingcell += 1;
                }
            }
        }
        let res = 0;
        if (livingcell === 3 || (this.board[i][j] === 1 && livingcell === 4)) {
            res = 1;
        }
        return res;
    }
    public nextState(): void {
        const newboard = this.newBoard();
        for (let i = 0; i < newboard.length; i++) {
            for (let j = 0; j < newboard[0].length; j++) {
                newboard[i][j] = this.changeStateOfCell(i, j);
            }
        }
        this.board = newboard;
        this.eventEmiter.emit("changeStateBoard", {board: this.board});
    }
    public clearBoard(): void {
        this.board = this.newBoard();
        this.eventEmiter.emit("changeStateBoard", {board: this.board});
    }
    public changeQuantityCell(width: number, height: number): void {
        this.width = Math.floor(width / this.CELL_SQUARE);
        this.height = Math.floor(height / this.CELL_SQUARE);
        this.board = this.newBoard();
        this.eventEmiter.emit("changeStateBoard", {board: this.board});
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
    public set setBoard(testboard: number[][]) {
        this.board = testboard;
        this.height = testboard.length;
        this.width = testboard[0].length;
    }
}
