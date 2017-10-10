import View from '../tsmvc/View.ts';
import Model from '../tsmvc/Model.ts';
import Controller from '../tsmvc/Controller.ts';

import * as assert from "assert";

describe("Controller.", function() {
    let view = new View();
    let model = new Model();
    let stub = sinon.stub(view, "drawCanvas");
    describe("controller.subscribing", function() {
        let spySubscribingView;
        let spySubscribingModel;
        before (() => {
            spySubscribingView = sinon.spy(view.eventEmiter, "subscribe");
            spySubscribingModel = sinon.spy(model.eventEmiter, "subscribe");
        });
        after (() => {
            spySubscribingView.restore();
            spySubscribingModel.restore();
        });
        
        it("Выполнение подписки на наблюдателя", function() {
            let controller = new Controller(model,view);
            assert.equal(spySubscribingView.callCount, 7, " Подписок на вью выполнено не 7!")
            assert.equal(spySubscribingModel.callCount, 1, " Подписок на вью выполнено не 7!")
            
        });
    });
    describe("controller.startLife", function() {
        let controller = new Controller(model,view);
        it("startLife", function() {
            controller.startLife();
            assert.equal(!(controller.timer), false, "таймер не пуст")
        });
        it("startLife after startLife", function() {
            controller.startLife();
            assert.equal(!(controller.timer), false, "таймер не пуст")
        });

    });
    describe("controller.stoplife", function() {
        let controller = new Controller(model,view);
        it("stoplife", function() {
            controller.stopLife();
            assert.equal(!(controller.timer), true, "таймер пуст")
        });
        it("stoplife after stoplife", function() {
            controller.stopLife();
            assert.equal(!(controller.timer), true, "таймер не пуст")
        });
    });
});