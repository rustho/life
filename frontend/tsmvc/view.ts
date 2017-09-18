import * as $ from "jquery";
import EventEmiter from "./EventEmiter";
export default class {
    public eventEmiter: any;
    private $field: any;
    private $start: any;
    private $stop: any;
    private $clear: any;
    private $changeHeight: any;
    private $changeWidth: any;
    private $changeSpeed: any;

    constructor() {
        this.eventEmiter = new EventEmiter();
        this.addItems();
        this.addEvents();
        this._changeHeight = this._changeHeight.bind(this);
        this._changeWidth = this._changeWidth.bind (this);
        this._changeSpeed = this._changeSpeed.bind(this);
        this._clearBord = this._clearBord.bind(this);
        this._clickCell = this._clickCell.bind(this);
        this._startLife = this._startLife.bind(this);
        this._stopLife = this._stopLife.bind(this);
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
        e.data.view.eventEmiter.emit("startLife");
    }
    private _stopLife(e) {
        e.data.view.eventEmiter.emit("stopLife");
    }
    private _clearBord(e) {
        e.data.view.eventEmiter.emit("clearBoard");
    }
    private _changeWidth(e) {
        const width = parseInt(e.data.view.$changeWidth.val().toString(), 10);
        const height = e.data.view.$field.height();
        e.data.view.eventEmiter.emit("changeWidth", {width, height});
    }
    private _changeHeight(e) {
        const height = parseInt(e.data.view.$changeHeight.val().toString(), 10);
        const width = e.data.view.$field.width();
        e.data.view.eventEmiter.emit("changeHeight", {width, height});
    }
    private _changeSpeed(e) {
        const speed = parseInt(prompt("speed in mlsec?", "500"), 10);
        e.data.view.eventEmiter.emit("changeSpeed", {speed});
    }

    private _clickCell(e) {
            const xo = e.offsetX;
            const yo = e.offsetY;
            e.data.view.eventEmiter.emit("clickCell", {x: xo, y: yo});
        }
}
