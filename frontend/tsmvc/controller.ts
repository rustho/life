
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

        this.startLife = this.startLife.bind(this);
        this.stopLife = this.stopLife.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.clickOnCell = this.clickOnCell.bind(this);
        this.changeSpeed = this.changeSpeed.bind(this);

        this.view.eventEmiter.subscribe("startLife", this.startLife);
        this.view.eventEmiter.subscribe("stopLife", this.stopLife);
        this.view.eventEmiter.subscribe("clearBoard", this.clearBoard);
        this.view.eventEmiter.subscribe("clickCell", this.clickOnCell);
        this.view.eventEmiter.subscribe("changeWidth", this.changeSize);
        this.view.eventEmiter.subscribe("changeHeight", this.changeSize);
        this.view.eventEmiter.subscribe("changeSpeed", this.changeSpeed);

        this.model.changeStateBoard.addSubscriber(this.modelObserver);
        this.startLife();
        this.stopLife();

    }

    public startLife(): void {
        if (!this.timer) {
            this.timer = setInterval(this.model.nextState, this.speed);
        }
    }

    public stopLife() {
        if (this.timer !== false) {
            clearInterval(this.timer);
            this.timer = false;
        }
    }

    public clearBoard() {
        this.model.clearBoard();
    }

    public changeSize(options: any) {
        const width: number = options.width;
        const height: number = options.height;
        this.view.changeSize(width, height);
        this.model.changeQuantityCell(width, height);
    }

    public clickOnCell(options: any) {
        const x: number = options.x;
        const y: number = options.y;
        this.model.findCellAndChange(x, y);
    }
    public changeSpeed(options: any) {
        const speed: number = options.speed;
        if (speed > 0) {
            this.speed = speed;
        }
        this.stopLife();
        this.startLife();
    }


    public modelObserver = (event) => this.view.drawCanvas(event.detail.board);
}
