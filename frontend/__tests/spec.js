
import Model from '../tsmvc/model.ts';
const model = new Model();

import * as assert from "assert";

describe("model.clearBoard", function() {
  it("очистка поля от живых клеток", function() {
    var board = [
        [1,1,1,1],
        [1,1,1,1],
        [1,1,1,1],
        [1,1,1,1]
    ]
    var clearBoard = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    model.setBoard(board);
    model.clearBoard();
    board = model.getBoard()
    assert.deepEqual(board,clearBoard,'Доска не очищена');
  });

});
describe("model.Next state", function() {

  it("У фигуры улей", function() {
    var board = [
        [0,1,0,0],
        [1,0,1,0],
        [1,0,1,0],
        [0,1,0,0]
    ]
    var rightBoard = [
        [0,1,0,0],
        [1,0,1,0],
        [1,0,1,0],
        [0,1,0,0]
    ]
    model.setBoard(board);
    model.nextState(board);
    board = model.getBoard()
    assert.deepEqual(board,rightBoard,'недвижимая фигура двигается');
  })
  it("У недвижимой фигуры квадрата", function() {
    var board = [
        [0,0,0,0],
        [1,1,0,0],
        [1,1,0,0],
        [0,0,0,0]
    ]
    var rightBoard = [
        [0,0,0,0],
        [1,1,0,0],
        [1,1,0,0],
        [0,0,0,0]
    ]
    model.setBoard(board);
    model.nextState(board);
    board = model.getBoard()
    assert.deepEqual(board,rightBoard,'недвижимая фигура двигается');
  })
  it("У недвижимой фигуры квадрата", function() {
    var board = [
        [0,1,1,0],
        [1,0,0,1],
        [1,0,0,1],
        [0,1,1,0]
    ]
    var rightBoard = [
        [0,1,1,0],
        [1,0,0,1],
        [1,0,0,1],
        [0,1,1,0]
    ]
    model.setBoard(board);
    model.nextState(board);
    board = model.getBoard()
    assert.deepEqual(board,rightBoard,'недвижимая фигура двигается');
  })
  it("У планера", function() {
    var board = [
        [0,1,0,0,0],
        [0,0,1,0,0],
        [1,1,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]
    var rightBoard = [
        [0,0,0,0,0],
        [1,0,1,0,0],
        [0,1,1,0,0],
        [0,1,0,0,0],
        [0,0,0,0,0]
    ]
    board = model.nextState(board);
    assert.deepEqual(board,rightBoard,'1 шаг');
    var rightBoard = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [1,0,1,0,0],
        [0,1,1,0,0],
        [0,0,0,0,0]
    ]
    board = model.nextState(board);
    assert.deepEqual(board,rightBoard,'2 шаг');
    var rightBoard = [
        [0,0,0,0,0],
        [0,1,0,0,0],
        [0,0,1,1,0],
        [0,1,1,0,0],
        [0,0,0,0,0]
    ]
    board = model.nextState(board);
    assert.deepEqual(board,rightBoard,'3 шаг');
    var rightBoard = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,0,1,0],
        [0,1,1,1,0],
        [0,0,0,0,0]
    ]
    board = model.nextState(board);
    assert.deepEqual(board,rightBoard,'4 шаг');
  })
});
describe("model.findCellAndChange", function() {
  
  it("Изменение в середине клетки на поле по координатам", function() {
    var board = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]
    var rightBoard = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]
    model.setBoard(board);
    model.findCellAndChange(250,250);
    board = model.getBoard()
    assert.deepEqual(board,rightBoard,'заданная клетка не изменилась');
  });

});
