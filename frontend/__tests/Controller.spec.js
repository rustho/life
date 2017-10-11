import View from '../tsmvc/View.ts';
import Model from '../tsmvc/Model.ts';
import Controller from '../tsmvc/Controller.ts';

import * as assert from "assert";

describe("Controller.", function() {
    let view = new View();
    let model = new Model();
    
    describe("controller.subscribing", function() {
        let spySubscribingView;
        let spySubscribingModel;
        let stub = sinon.stub(view, "drawCanvas");

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
        it("Запуск жизни", function() {
            controller.startLife();
            assert.equal(!(controller.timer), false, "таймер не пуст")
        });
        it("Запуск жизни уже после запуска", function() {
            controller.startLife();
            assert.equal(!(controller.timer), false, "таймер не пуст")
        });

    });
    
    describe("controller.stoplife", function() {
        let controller = new Controller(model,view);
        
        it("Остановка", function() {
            controller.stopLife();
            assert.equal(!(controller.timer), true, "таймер не пуст")
        });
        
        it("Остановка после остановки", function() {
            controller.stopLife();
            assert.equal(!(controller.timer), true, "таймер не пуст")
        });
    });

    describe("controller.clearBoard", function() {
        let controller = new Controller(model,view);
        const correctBoard = [];
        before(() => {
            let testBoard = [
                [0,1,1,0,0],
                [1,0,0,1,0],
                [1,0,0,1,0],
                [0,1,1,0,0],
                [0,0,0,0,0]
            ]
            controller.model.setBoard=testBoard;

            for (let i = 0; i < 5; i++) {
                correctBoard[i] = [];
                for (let j = 0; j < 5; j++) {
                    correctBoard[i][j] = 0;
                }
            }
        })
        it("Очистка жизни с доски 5*5", function() {
            
            controller.clearBoard();
            
            assert.deepEqual(controller.model.getBoard(), correctBoard, "Модель не очистила доску")
            assert.equal(!(controller.timer), true, "таймер не пуст")
        });
    });
    
    describe("controller.changeSize", function() {
        let controller = new Controller(model,view);
        let stub = sinon.stub(view, "changeSize").callsFake(function () {
            return 'ok';
        });
        const correctBoard = [];
        before(() => {

            for (let i = 0; i < 5; i++) {
                correctBoard[i] = [];
                for (let j = 0; j < 5; j++) {
                    correctBoard[i][j] = 0;
                }
            }
        })
        it("Изменение размера канваса 100px 100px", function() {
            
            controller.changeSize(100,100);

            assert.deepEqual(controller.model.getBoard(), correctBoard, "Модель неправильно изменила размер")
            assert.deepEqual(
                [stub.args[0][0],stub.args[0][1]], 
                [100,100], 
                " Неправильно изменился вид в канвасе ")
        });
    });
    
});