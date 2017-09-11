import * as $ from "jquery";
export default class {
    private publisher: any;

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
    }
    public addEvents() {
        const self = this;
        $("#start").click(() => self._startLife());
        $("#stop").click(() => self._stopLife());
        $("#clear").click(() => self._clearBord());
        $("#change_width").blur(() => self._changeWidth());
        $("#change_height").blur(() => self._changeHeight());
        $("#change_speed").click(() => self._changeSpeed());
        $("#field").click(function(e) {
            const x = e.pageX;
            const xo = this.offsetLeft;
            const y = e.pageY;
            const yo = this.offsetTop;
            const clickOnCell = new CustomEvent("clickOnCell", {
                bubbles: true,
                detail: { x: x - xo, y: y - yo },
            });
            self.publisher.notifySubscribers(clickOnCell);
        });
    }
    public changeSize(width, height) {
        const canvas = $("#field").get(0) as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;
    }
    public drawCanvas(board) {
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
    public _startLife() {
        const startLife = new CustomEvent("startLife", { bubbles: true });
        this.publisher.notifySubscribers(startLife);
    }
    public _stopLife() {
        const stopLife = new CustomEvent("stopLife", { bubbles: true });
        this.publisher.notifySubscribers(stopLife);
    }
    public _clearBord() {
        const clearBoard = new CustomEvent("clearBoard", { bubbles: true });
        this.publisher.notifySubscribers(clearBoard);
    }
    public _changeWidth() {
        const width = parseInt($("#change_width").val().toString(), 10);
        const height = $("#field").height();
        const changeWidth = new CustomEvent("changeWidth", {
            bubbles: true,
            detail: { width, height },
        });
        this.publisher.notifySubscribers(changeWidth);
    }
    public _changeHeight() {
        const height = parseInt($("#change_height").val().toString(), 10);
        const width = $("#field").width();
        const changeHeight = new CustomEvent("changeHeight", {
            bubbles: true,
            detail: { width, height },
        });
        this.publisher.notifySubscribers(changeHeight);
    }
    public _changeSpeed() {
        const speed = parseInt(prompt("speed in mlsec?", "500"), 10);
        const changeSpeed = new CustomEvent("changeSpeed", {
            bubbles: true,
            detail: { speed },
        });
        this.publisher.notifySubscribers(changeSpeed);
    }
}
