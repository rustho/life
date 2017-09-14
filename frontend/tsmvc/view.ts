import * as $ from "jquery";
export default class {
    public publisher: any;

    constructor() {
        this.publisher = {
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
        this._startLife = this._startLife.bind(this);
        this._stopLife = this._stopLife.bind(this);
        this._clearBord = this._clearBord.bind(this);
        this._changeWidth = this._changeWidth.bind(this);
        this._changeHeight = this._changeHeight.bind(this);
        this._changeSpeed = this._changeSpeed.bind(this);
        this._clickCell = this._clickCell.bind(this);
    }
    public addEvents(): void  {
        const self = this;
        $("#start").click({view: this}, (e) => e.data.view._startLife(e));
        $("#stop").click({view: this}, (e) => e.data.view._stopLife(e));
        $("#clear").click({view: this}, (e) => e.data.view._clearBord(e));
        $("#change_width").blur({view: this}, (e) => e.data.view._changeWidth(e));
        $("#change_height").blur({view: this}, (e) => this._changeHeight(e));
        $("#change_speed").click({view: this}, (e) => this._changeSpeed(e));
        $("#field").click({view: this}, (e) => e.data.view._clickCell(e) );
    }
    public changeSize(width: number, height: number): void {
        const canvas = $("#field").get(0) as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;
    }
    public drawCanvas(board: number[][]): void {
        const canvas = $("#field").get(0) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        const height = board.length;
        const width = board[0].length;
        const cellsquare = 20;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (board[i][j] === 1) {
                    ctx.fillRect(j * cellsquare, i * cellsquare, cellsquare, cellsquare);
                }
                if (board[i][j] === 0) {
                    ctx.strokeRect(j * cellsquare, i * cellsquare, cellsquare, cellsquare);
                }
            }
        }
    }
    public _startLife(e) {
            const startLife = new CustomEvent("startLife", { bubbles: true });
            e.data.view.publisher.notifySubscribers(startLife);
    }
    public _stopLife(e) {
        const stopLife = new CustomEvent("stopLife", { bubbles: true });
        e.data.view.publisher.notifySubscribers(stopLife);
    }
    public _clearBord(e) {
        const clearBoard = new CustomEvent("clearBoard", { bubbles: true });
        e.data.view.publisher.notifySubscribers(clearBoard);
    }
    public _changeWidth(e) {
        const width = parseInt($("#change_width").val().toString(), 10);
        const height = $("#field").height();
        const changeWidth = new CustomEvent("changeWidth", {
            bubbles: true,
            detail: { width, height },
        });
        e.data.view.publisher.notifySubscribers(changeWidth);
    }
    public _changeHeight(e) {
        const height = parseInt($("#change_height").val().toString(), 10);
        const width = $("#field").width();
        const changeHeight = new CustomEvent("changeHeight", {
            bubbles: true,
            detail: { width, height },
        });
        e.data.view.publisher.notifySubscribers(changeHeight);
    }
    public _changeSpeed(e) {
        const speed = parseInt(prompt("speed in mlsec?", "500"), 10);
        const changeSpeed = new CustomEvent("changeSpeed", {
            bubbles: true,
            detail: { speed },
        });
        e.data.view.publisher.notifySubscribers(changeSpeed);
    }

    public _clickCell(e) {
            const x = e.pageX;
            const xo = e.offsetLeft;
            const y = e.pageY;
            const yo = e.offsetTop;
            const clickOnCell = new CustomEvent("clickOnCell", {
                bubbles: true,
                detail: { x: x - xo, y: y - yo },
            });
            e.data.view.publisher.notifySubscribers(clickOnCell);
        }
}
