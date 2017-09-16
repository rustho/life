import * as $ from "jquery";
export default class {
    public publisher: any;
    private $field: any;
    private $start: any;
    private $stop: any;
    private $clear: any;
    private $changeHeight: any;
    private $changeWidth: any;
    private $changeSpeed: any;

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

        for (const property in this) {
            if (typeof this[property] !== typeof Function) {
                continue;
            }
            const method: string = property.toString();
            this[method] = this[method].bind(this);
        }
        this.addItems();
        this.addEvents();
    }

    public changeSize(width: number, height: number): void {
        const canvas = this.$field.get(0) as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;
    }
    public drawCanvas(board: number[][]): void {
        const canvas = this.$field.get(0) as HTMLCanvasElement;
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
    private addItems(): void {
        this.$start = $("#start");
        this.$stop = $("#stop");
        this.$clear = $("#clear");
        this.$changeWidth = $("#change_width");
        this.$changeHeight = $("#change_height");
        this.$changeSpeed = $("#change_speed");
        this.$field = $("#field");
    }
    private addEvents(): void  {
        this.$start.click({view: this}, this._startLife);
        this.$stop.click({view: this}, this._stopLife);
        this.$clear.click({view: this}, this._clearBord);
        this.$changeWidth.blur({view: this}, this._changeWidth);
        this.$changeHeight.blur({view: this}, this._changeHeight);
        this.$changeSpeed.click({view: this}, this._changeSpeed);
        this.$field.off("click").on("click", {view: this}, this._clickCell );
    }
    private _startLife(e) {
        const startLife = new CustomEvent("startLife", { bubbles: true });
        e.data.view.publisher.notifySubscribers(startLife);
    }
    private _stopLife(e) {
        const stopLife = new CustomEvent("stopLife", { bubbles: true });
        e.data.view.publisher.notifySubscribers(stopLife);
    }
    private _clearBord(e) {
        const clearBoard = new CustomEvent("clearBoard", { bubbles: true });
        e.data.view.publisher.notifySubscribers(clearBoard);
    }
    private _changeWidth(e) {
        const width = parseInt(e.data.view.$changeWidth.val().toString(), 10);
        const height = e.data.view.$field.height();
        const changeWidth = new CustomEvent("changeWidth", {
            bubbles: true,
            detail: { width, height },
        });
        e.data.view.publisher.notifySubscribers(changeWidth);
    }
    private _changeHeight(e) {
        const height = parseInt(e.data.view.$changeHeight.val().toString(), 10);
        const width = e.data.view.$field.width();
        const changeHeight = new CustomEvent("changeHeight", {
            bubbles: true,
            detail: { width, height },
        });
        e.data.view.publisher.notifySubscribers(changeHeight);
    }
    private _changeSpeed(e) {
        const speed = parseInt(prompt("speed in mlsec?", "500"), 10);
        const changeSpeed = new CustomEvent("changeSpeed", {
            bubbles: true,
            detail: { speed },
        });
        e.data.view.publisher.notifySubscribers(changeSpeed);
    }

    private _clickCell(e) {
            const xo = e.offsetX;
            const yo = e.offsetY;
            const clickOnCell = new CustomEvent("clickOnCell", {
                bubbles: true,
                detail: { x: xo , y: yo },
            });
            e.data.view.publisher.notifySubscribers(clickOnCell);
        }
}
