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
        this.view.addEvents();
        this.model.changeStateBoard.addSubscriber(this.modelObserver);
        this.view.publisher.addSubscriber(this.viewObserver);
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
                this.model.clearBoard();
                break;
            case "changeHeight":
                this.view.changeSize(event.detail.width, event.detail.height);
                this.model.changeQuantityCell(event.detail.width, event.detail.height);
                break;
            case "changeWidth":
                this.view.changeSize(event.detail.width, event.detail.height);
                this.model.changeQuantityCell(event.detail.width, event.detail.height);
                break;
            case "clickOnCell":
                this.model.findCellAndChange(event.detail.x, event.detail.y);
                break;
            case "changeSpeed":
                this.changeSpeed = event.detail.speed;
                break;
        }
    }
}
