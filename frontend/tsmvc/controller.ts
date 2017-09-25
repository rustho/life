import binding from "./binding";
import EventEmiter from "./EventEmiter";
import Model from "./model";
import View from "./view";

export default class {
    private model: Model;
    private view: View;
    private timer: number;
    private speed: number;
    constructor(model: Model, view: View) {
        this.timer = undefined;
        this.speed = 1000;
        this.model = model;
        this.view = view;

        binding(this);

        this.view.eventEmiter.subscribe("startLife", this.startLife);
        this.view.eventEmiter.subscribe("stopLife", this.stopLife);
        this.view.eventEmiter.subscribe("clearBoard", this.clearBoard);
        this.view.eventEmiter.subscribe("clickCell", this.clickOnCell);
        this.view.eventEmiter.subscribe("changeWidth", this.changeSize);
        this.view.eventEmiter.subscribe("changeHeight", this.changeSize);
        this.view.eventEmiter.subscribe("changeSpeed", this.changeSpeed);

        this.model.eventEmiter.subscribe("changeStateBoard", this.updateCanvas);

        this.model.nextState();

    }

    public startLife(): void {
        if (typeof this.timer === "undefined") {
            this.timer = setInterval(this.model.nextState, this.speed);
        }
    }

    public stopLife() {
        if (!(typeof this.timer === "undefined")) {
            clearInterval(this.timer);
        }
    }

    public clearBoard() {
        this.model.clearBoard();
    }

    public changeSize(width, height) {
        this.view.changeSize(width, height);
        this.model.changeQuantityCell(width, height);
    }

    public clickOnCell(x, y) {
        this.model.findCellAndChange(x, y);
    }
    public changeSpeed(speed) {
        if (speed > 0) {
            this.speed = speed;
        }
        this.stopLife();
        this.startLife();
    }


    public updateCanvas(board) {
        this.view.drawCanvas(board);
    }
}
