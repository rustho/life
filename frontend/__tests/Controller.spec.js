import View from '../tsmvc/View.ts';
import Model from '../tsmvc/Model.ts';
import Controller from '../tsmvc/Controller.ts';


import * as assert from "assert";

describe("controller.", function() {
    let view = new View();
    let model = new Model();
    let stub = sinon.stub(model);
    const controller = new Controller(model,view);
    describe("controller.", function() {
        it("startLife", function() {

            let spyStartLife = sinon.spy(controller, "startLife");
            view.eventEmiter.emit("startLife");
            view.eventEmiter.emit("startLife");
            view.eventEmiter.emit("startLife");
            spyStartLife.restore();
            console.log(controller);
            assert.equal(spyStartLife.callCount, true, "Неправильно поешь!")
        });
    });
});