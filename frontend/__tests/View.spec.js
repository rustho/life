import View from '../tsmvc/View.ts';
import * as JQuery from "jquery";

let view = new View();
import * as assert from "assert";

describe("View", function(){
    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    document.body.appendChild(canvas);
    let view = new View();

    describe("View.changeSize",  function() {
        document.body.appendChild(canvas);
        it("Изменение длины и ширины канваса", function() {
            var correctCanvas = document.createElement('canvas');
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
    
})