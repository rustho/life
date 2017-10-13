import * as $ from "jquery";
import binding from "./binding";
import EventEmiter from "./EventEmiter";
import {IView} from "./types/IView";
export default class View extends EventEmiter implements IView {
    public $field: JQuery<HTMLElement>;
    public $start: JQuery<HTMLElement>;
    private $stop: JQuery<HTMLElement>;
    private $clear: JQuery<HTMLElement>;
    private $changeHeight: JQuery<HTMLElement>;
    private $changeWidth: JQuery<HTMLElement>;
    private $changePeriod: JQuery<HTMLElement>;

    constructor() {
        super();
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
        this.$start = $(".start");
        this.$stop = $(".stop");
        this.$clear = $(".clear");
        this.$changeWidth = $(".change_width");
        this.$changeHeight = $(".change_height");
        this.$changePeriod = $(".change_speed");
        this.$field = $("canvas");
    }
    private addEvents(): void  {
        this.$start.click({view: this}, this.startLife);
        this.$stop.click({view: this}, this.stopLife);
        this.$clear.click({view: this}, this.clearBord);
        this.$changeWidth.blur({view: this}, this.changeWidth);
        this.$changeHeight.blur({view: this}, this.changeHeight);
        this.$changePeriod.click({view: this}, this.changePeriod);
        this.$field.first().off("click").on("click", {view: this}, this.clickCell );
    }
    private startLife(event) {
        event.data.view.emit("startLife");
    }
    private stopLife(event): void  {
        event.data.view.emit("stopLife");
    }
    private clearBord(event): void  {
        event.data.view.emit("clearBoard");
    }
    private changeWidth(event) {
        const width = parseInt(event.data.view.$changeWidth.val(), 10);
        const height = event.data.view.$field.height();
        event.data.view.emit("changeWidth", width, height);
    }
    private changeHeight(event)  {
        const height = parseInt(event.data.view.$changeHeight.val(), 10);
        const width = event.data.view.$field.width();
        event.data.view.emit("changeHeight", width, height);
    }
    private changePeriod(event)  {
        let userText = (prompt("period in mlsec?", "500"));
        let period: number = 0;
        userText = (userText === null) ? "100" : userText;
        period = parseInt((userText), 10);

        event.data.view.emit("changePeriod", period);
    }

    private clickCell(event): void  {
        const x = event.offsetX;
        const y = event.offsetY;
        event.data.view.emit("clickCell", x, y);
   }
}
