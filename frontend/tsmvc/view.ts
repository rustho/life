import * as $ from "jquery";
import EventEmiter from "./EventEmiter";
export default class {
    public eventEmiter: EventEmiter;
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
    }

    public changeSize = (width: number, height: number): void => {
        const canvas = this.$field.get(0) as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;
    }
    public drawCanvas = (board: number[][]): void  => {
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
    private addItems = (): void => {
        this.$start = $("#start");
        this.$stop = $("#stop");
        this.$clear = $("#clear");
        this.$changeWidth = $("#change_width");
        this.$changeHeight = $("#change_height");
        this.$changeSpeed = $("#change_speed");
        this.$field = $("#field");
    }
    private addEvents = (): void =>  {
        this.$start.click({view: this}, this.startLife);
        this.$stop.click({view: this}, this.stopLife);
        this.$clear.click({view: this}, this.clearBord);
        this.$changeWidth.blur({view: this}, this.changeWidth);
        this.$changeHeight.blur({view: this}, this.changeHeight);
        this.$changeSpeed.click({view: this}, this.changeSpeed);
        this.$field.off("click").on("click", {view: this}, this.clickCell );
    }
    private startLife = (e: any): void => {
        e.data.view.eventEmiter.emit("startLife");
    }
    private stopLife = (e: any): void  => {
        e.data.view.eventEmiter.emit("stopLife");
    }
    private clearBord = (e: any): void => {
        e.data.view.eventEmiter.emit("clearBoard");
    }
    private changeWidth = (e: any): void => {
        const width = parseInt(e.data.view.$changeWidth.val().toString(), 10);
        const height = e.data.view.$field.height();
        e.data.view.eventEmiter.emit("changeWidth", {width, height});
    }
    private changeHeight = (e: any): void => {
        const height = parseInt(e.data.view.$changeHeight.val().toString(), 10);
        const width = e.data.view.$field.width();
        e.data.view.eventEmiter.emit("changeHeight", {width, height});
    }
    private changeSpeed = (e: any): void => {
        const speed = parseInt(prompt("speed in mlsec?", "500"), 10);
        e.data.view.eventEmiter.emit("changeSpeed", {speed});
    }

    private clickCell = (e: any): void => {
            const xo = e.offsetX;
            const yo = e.offsetY;
            e.data.view.eventEmiter.emit("clickCell", {x: xo, y: yo});
        }
}
