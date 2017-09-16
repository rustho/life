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
        this.model.changeStateBoard.addSubscriber(this.modelObserver);
        this.view.publisher.addSubscriber(this.viewObserver);
        this.startLife();
    }
    public startLife() {
        if (this.timer === false) {
            this.timer = setInterval(() => this.model.nextState(), this.speed);
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

    public changeSize(width: number, height: number) {
        this.view.changeSize(width, height);
        this.model.changeQuantityCell(width, height);
    }

    public clickOnCell(x: number, y: number) {
        this.model.findCellAndChange(x, y);
    }
    public set changeSpeed(speed: number) {
        if (speed > 0) {
            this.speed = speed;
        }
        this.stopLife();
        this.startLife();
    }


    public modelObserver = (event) => this.view.drawCanvas(event.detail.board);
    public viewObserver = (event) => {
        switch (event.type) {
            case "startLife":
                this.startLife();
                break;
            case "stopLife":
                this.stopLife();
                break;
            case "clearBoard":
                this.clearBoard();
                break;
            case "changeHeight":
                this.changeSize(event.detail.width, event.detail.height);
                break;
            case "changeWidth":
                this.changeSize(event.detail.width, event.detail.height);
                break;
            case "clickOnCell":
                this.clickOnCell(event.detail.x, event.detail.y);
                break;
            case "changeSpeed":
                this.changeSpeed = event.detail.speed;
                break;
        }
    }
}
