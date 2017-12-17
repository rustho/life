import View from '../tsmvc/View.ts';
import * as JQuery from "jquery";

let view = new View();
import * as assert from "assert";

describe("View", function(){
    
    var canvas = document.createElement('canvas');
    canvas.className="js-field";
    canvas.width = 400;
    canvas.height = 400;
    document.body.appendChild(canvas);
    let view = new View();

    describe("View.changeSize",  function() {
        
        it("Изменение длины и ширины канваса", function() {
            var correctCanvas = document.createElement('canvas');
            correctCanvas.className="js-field";
            correctCanvas.width = 200;
            correctCanvas.height = 200;

            view.changeSize(200,200);
            assert.equal(canvas.isEqualNode(correctCanvas),true, 'Размеры задаются не правильно')
        })
    }); 
    
    describe("View.drawCanvas",  function() {
        
        it("Рисование на канвасе", function() {
            
            var correctCanvas = document.createElement('canvas');
            correctCanvas.width = 200;
            correctCanvas.height = 200;

            const board = [];
            for (let i = 0; i < 10; i++) {
                board[i] = [];
                for (let j = 0; j < 10; j++) {
                    board[i][j] = (i!=j) ? 0 : 1;
                }
            };
            
            const ctx = correctCanvas.getContext("2d");
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
            
            view.drawCanvas(board);
            assert.equal(correctCanvas.toDataURL(), canvas.toDataURL(), 'Разные рисунки')
        })
    }); 
    
    describe("View.events",  function() {
        

        let stubOnEventEmiter;
        
        beforeEach(() => {
            stubOnEventEmiter = sinon.stub(view, "emit");
        });
        
        afterEach(() => {
            stubOnEventEmiter.restore();
        });
        
        it("Клик по старту", function() {
            let event = new Event("startLife");
            event.data = {view};
            view.startLife(event);
            assert.equal(stubOnEventEmiter.args[0][0],"startLife", 'eventEmiter не получил нужное событие')
        });
        
        it("Клик по стопу", function() {
            let event = new Event("stopLife");
            event.data = {view};
            view.stopLife(event);
            assert.equal(stubOnEventEmiter.args[0][0],"stopLife", 'eventEmiter не получил нужное событие')
        });

        describe("ChangeSize",  function() {
            let stubOnChangeWidth;
            let stubOnChangeHeight;
            
            before( () => {
                stubOnChangeWidth = sinon.stub(view.$changeWidth, "val").returns('100');
                stubOnChangeHeight = sinon.stub(view.$field,"height").returns(100);
            })
            
            after( () => {
                stubOnChangeHeight.restore();
                stubOnChangeWidth.restore();
            })
            
            it("Клик по изменению длины", function() {
                let event = new Event("changeWidth");
                event.data = {view};
                view.changeWidth(event);
                assert.deepEqual(
                    [stubOnEventEmiter.args[0][0],stubOnEventEmiter.args[0][1],stubOnEventEmiter.args[0][2]],
                    ["changeWidth",100,100], 'eventEmiter не получил нужное событие'
                );
            });
            
            before( () => {
                stubOnChangeHeight = sinon.stub(view.$changeHeight, "val").returns("100");
                stubOnChangeWidth = sinon.stub(view.$field,"width").returns(100);
            })
            
            after( () => {
                stubOnChangeHeight.restore();
                stubOnChangeWidth.restore();
            })
            
            it("Клик по изменению высоты", function() {
                let event = new Event("changeHeight");
                event.data = {view};
                view.changeHeight(event);
                assert.deepEqual(
                    [stubOnEventEmiter.args[0][0],stubOnEventEmiter.args[0][1],stubOnEventEmiter.args[0][2]],
                    ["changeHeight",100,100], 'eventEmiter не получил нужное событие'
                );
            });
        });
        
        it("Клик по полю", function() {
            
            let event = new Event("clickCell");
            event.data = {view};
            event.offsetX = 100;
            event.offsetY = 100;
            view.clickCell(event);
            
            assert.deepEqual(
                [stubOnEventEmiter.args[0][0],stubOnEventEmiter.args[0][1],stubOnEventEmiter.args[0][2]],
                ["clickCell",100,100], 'eventEmiter не получил нужное событие'
            );
        });

        it("Клик по изменению периода", function() {
            
            let event = new Event("changePeriod");
            event.data = {view};
            
            let stubOnPrompt = sinon.stub(window, "prompt").returns("100")
            view.changePeriod(event);
            
            assert.deepEqual(
                [stubOnEventEmiter.args[0][0],stubOnEventEmiter.args[0][1]],
                ["changePeriod",100], 'eventEmiter не получил нужное событие'
            );
            stubOnPrompt.restore();
        });
        
        it("Клик по изменению периода(ОТМЕНА)", function() {
            
            let event = new Event("changePeriod");
            event.data = {view};
            
            let stubOnPrompt = sinon.stub(window, "prompt").returns(null);
            view.changePeriod(event);
            
            assert.deepEqual(
                [stubOnEventEmiter.args[0][0],stubOnEventEmiter.args[0][1]],
                ["changePeriod",100], 'eventEmiter не получил нужное событие'
            );
            stubOnPrompt.restore();
        });

    }); 
    
})