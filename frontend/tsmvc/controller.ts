
import EventEmiter from "./EventEmiter";
import Model from "./model";
import View from "./view";

export default class {

    private model: Model;
    private view: View;
    private timer: any;
    private speed: number;

    constructor(model: Model, view: View) {

        this.timer = false;
        this.speed = 1000;
        this.model = model;
        this.view = view;

        this.view.eventEmiter.subscribe("startLife", this.startLife);
        this.view.eventEmiter.subscribe("stopLife", this.stopLife);
        this.view.eventEmiter.subscribe("clearBoard", this.clearBoard);
        this.view.eventEmiter.subscribe("clickCell", this.clickOnCell);
        this.view.eventEmiter.subscribe("changeWidth", this.changeSize);
        this.view.eventEmiter.subscribe("changeHeight", this.changeSize);
        this.view.eventEmiter.subscribe("changeSpeed", this.changeSpeed);

        this.model.eventEmiter.subscribe("updateBoard", this.updateCanvas );

        this.model.nextState();

    }

    public updateCanvas = (options: any): void => {
        this.view.drawCanvas(options.board);
    }

    public startLife = (): void => {
        if (!this.timer) {
            this.timer = setInterval(this.model.nextState, this.speed);
        }
    }

    private stopLife = (): void => {
        if (this.timer !== false) {
            clearInterval(this.timer);
            this.timer = false;
        }
    }

    private clearBoard = (): void => {
        this.model.clearBoard();
    }

    private changeSize = (options: any): void => {
        const width: number = options.width;
        const height: number = options.height;
        this.view.changeSize(width, height);
        this.model.changeQuantityCell(width, height);
    }

    private clickOnCell = (options: any): void => {
        const x: number = options.x;
        const y: number = options.y;
        this.model.findCellAndChange(x, y);
    }

    private changeSpeed = (options: any): void => {
        const speed: number = options.speed;
        if (speed > 0) {
            this.speed = speed;
        }
        this.stopLife();
        this.startLife();
    }
}
