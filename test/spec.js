
var Model = require ('../frontend/mvc/model.js');

var model = Model();

describe("clearBoard", function() {

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
    model.clearLife();
    board = model.getBoard()
    expect(board).toEqual(clearBoard);
  });

});