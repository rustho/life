export default class {

    private width: number;
    private height: number;
    private timer: any;
    private speed: number;
    private board: number[][];
    private CELL_SQUARE: number;
    private changeStateBoard: any;

    constructor() {
        this.CELL_SQUARE = 20;
        this.changeStateBoard = {
            _subscribers: [],
            addSubscriber(object) {
                this._subscribers.push(object);
            },
            notifySubscribers(event) {
                for (const item of this._subscribers) {
                    item(event);
                }
            },
        };
        this.width = 20;
        this.height = 20;
        this.timer = false;
        this.speed = 1000;
        this.board = this.newBoard();
    }
    public _event() {
        const event = new CustomEvent("changeStateBoard", {
            bubbles: true,
            detail: { board: this.board },
        });
        return event;
    }
    public findCellAndChange(x, y) {
        const xCell = Math.floor(x / this.CELL_SQUARE);
        const yCell = Math.floor(y / this.CELL_SQUARE);
        if (this.board[yCell][xCell] === 0) {
            this.board[yCell][xCell] = 1;
        } else {
            this.board[yCell][xCell] = 0;
        }
        this.changeStateBoard.notifySubscribers(this._event());
    }
    public changeStateOfCell(i, j) {
        let livingcell = 0;
        for (let il = i - 1; il <= i + 1; il++) {
            for (let jl = j - 1; jl <= j + 1; jl++) {
                let ii = il;
                let jj = jl; // проверка для моделирования поверхности тора
                ii = (il === -1) ? this.height - 1 : ii;
                jj = (jl === -1) ? jj = this.width - 1 : jj;
                ii = (il === this.height) ? ii = 0 : ii;
                jj = (jl === this.width) ? jj = 0 : jj;
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
    public nextState(board) {
        const newboard = [];
        for (let i = 0; i < board.length; i++) {
            newboard[i] = [];
            for (let j = 0; j < board[0].length; j++) {
                newboard[i][j] = 0;
            }
        }
        for (let i = 0; i < newboard.length; i++) {
            for (let j = 0; j < newboard[0].length; j++) {
                newboard[i][j] = this.changeStateOfCell(i, j);
            }
        }
        this.board = newboard;
        this.changeStateBoard.notifySubscribers(this._event());
    }
    public startLife() {
        const self = this;
        if (this.timer === false) {
            this.timer = setInterval(() => self.nextState(self.board), this.speed);
        }
    }
    public stopLife() {
        if (this.timer !== false) {
            clearInterval(this.timer);
            this.timer = false;
        }
    }
    public clearBoard() {
        this.board = this.newBoard();
        this.changeStateBoard.notifySubscribers(this._event());
    }
    public changeQuantityCell(width, height) {
        this.width = Math.floor(width / this.CELL_SQUARE);
        this.height = Math.floor(height / this.CELL_SQUARE);
        this.board = this.newBoard();
        this.changeStateBoard.notifySubscribers(this._event());
    }
    public newBoard() {
        const board = [];
        for (let i = 0; i < this.height; i++) {
            board[i] = [];
            for (let j = 0; j < this.width; j++) {
                board[i][j] = 0;
            }
        }
        return board;
    }
    public getBoard() {
        return this.board;
    }
    public setBoard(testboard) {
        this.board = testboard;
        this.height = testboard.length;
        this.width = testboard[0].length;
    }
    public set setSpeed(speed) {
        if (speed > 0) {
            clearInterval(this.timer);
            this.timer = false;
            this.speed = speed;
            this.startLife();
        } else {
            // mockerror
        }
    }
    public set changeSpeed(speed) {
        if (speed > 0) {
            this.speed = speed;
        }
        this.stopLife();
        this.startLife();
    }
}
