import binding from "./binding";
import EventEmiter from "./EventEmiter";
import {IAbstractModel} from "./types/IModel";
import {IAbstractView} from "./types/IView";

import * as config from "./config/config.json";

export default class <Model extends IAbstractModel, View extends IAbstractView> {
    private model: Model;
    private view: View;
    private timer: number | null;
    private period: number;

    constructor(model: Model, view: View) {
        this.timer = undefined;
        this.period = config.period;
        this.model = model;
        this.view = view;

        binding(this);

        this.subscribing();

        this.startGame();

    }

    public startLife(): void {
        if (!this.timer) {
            this.timer = setInterval(this.model.nextState, this.period);
        }
    }

    public stopLife() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    public clearBoard() {
        this.model.clearBoard();
        this.stopLife();
    }

    public changeSize(width, height) {
        this.view.changeSize(width, height);
        this.model.changeQuantityCell(width, height);
    }

    public clickOnCell(x, y) {
        this.model.findCellAndChange(x, y);
    }

    public changePeriod(period) {
        if (period > 0) {
            this.period = period;
        }
        this.stopLife();
        this.startLife();
    }


    public updateCanvas(board) {
        this.view.drawCanvas(board);
    }

    private startGame(): void {
        this.model.nextState();
    }

    private subscribing() {
        this.view.subscribe("startLife", this.startLife);
        this.view.subscribe("stopLife", this.stopLife);
        this.view.subscribe("clearBoard", this.clearBoard);
        this.view.subscribe("clickCell", this.clickOnCell);
        this.view.subscribe("changeWidth", this.changeSize);
        this.view.subscribe("changeHeight", this.changeSize);
        this.view.subscribe("changePeriod", this.changePeriod);

        this.model.subscribe("changeStateBoard", this.updateCanvas);
    }
}
