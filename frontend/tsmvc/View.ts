import * as $ from "jquery";
import binding from "./binding";
import EventEmiter from "./EventEmiter";
export default class  {
    public eventEmiter: EventEmiter;
    private $field: JQuery<HTMLElement>;
    private $start: JQuery<HTMLElement>;
    private $stop: JQuery<HTMLElement>;
    private $clear: JQuery<HTMLElement>;
    private $changeHeight: JQuery<HTMLElement>;
    private $changeWidth: JQuery<HTMLElement>;
    private $changeSpeed: JQuery<HTMLElement>;

    constructor() {
        this.eventEmiter = new EventEmiter();
        this.findingElements();
        this.addEvents();
        binding(this);
    }

    public changeSize(width: number, height: number): void {
        const canvas = this.$field.get(0) as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;
    }
    public drawCanvas(board: number[][]): void {
        const canvas = this.$field.get(0) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        const cellsquare = 20;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        board.forEach((row, indexOfRow) => {
            board.forEach((element, indexOfColl) => {
                if (board[indexOfRow][indexOfColl] === 1) {
                    ctx.fillRect(indexOfColl * cellsquare, indexOfRow * cellsquare, cellsquare, cellsquare);
                }
                if (board[indexOfRow][indexOfColl] === 0) {
                    ctx.strokeRect(indexOfColl * cellsquare, indexOfRow * cellsquare, cellsquare, cellsquare);
                }
            });
        });
    }
    private findingElements(): void {
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
    private _startLife(event): void {
        event.data.view.eventEmiter.emit("startLife");
    }
    private _stopLife(event): void  {
        event.data.view.eventEmiter.emit("stopLife");
    }
    private _clearBord(event): void  {
        event.data.view.eventEmiter.emit("clearBoard");
    }
    private _changeWidth(event) {
        const width = parseInt(event.data.view.$changeWidth.val().toString(), 10);
        const height = event.data.view.$field.height();
        event.data.view.eventEmiter.emit("changeWidth", width, height);
    }
    private _changeHeight(event)  {
        const height = parseInt(event.data.view.$changeHeight.val().toString(), 10);
        const width = event.data.view.$field.width();
        event.data.view.eventEmiter.emit("changeHeight", width, height);
    }
    private _changeSpeed(event)  {
        const userText = (prompt("speed in mlsec?", "500"), 10);
        /* const speed = parseInt
        event.data.view.eventEmiter.emit("changeSpeed", speed); */
    }

    private _clickCell(event): void  {
        const x = event.offsetX;
        const y = event.offsetY;
        event.data.view.eventEmiter.emit("clickCell", x, y);
   }
}
