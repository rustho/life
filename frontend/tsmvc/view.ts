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
        this.addEvents();
    }
    public addEvents(): void  {
        const self = this;
        $("#start").click({view: this}, this._startLife);
        $("#stop").click({view: this}, this._stopLife);
        $("#clear").click({view: this}, this._clearBord);
        $("#change_width").blur({view: this}, this._changeWidth);
        $("#change_height").blur({view: this}, this._changeHeight);
        $("#change_speed").click({view: this}, this._changeSpeed);
        $("#change_speed").click({view: this}, this._changeSpeed);
        $("#field").off("click").on("click", {view: this}, this._clickCell );
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
            const xo = e.offsetX;
            const yo = e.offsetY;
            const clickOnCell = new CustomEvent("clickOnCell", {
                bubbles: true,
                detail: { x: xo , y: yo },
            });
            e.data.view.publisher.notifySubscribers(clickOnCell);
        }
}
