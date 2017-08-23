module.exports = function(model,view) {
    _model = model;
    _view = view;
    
    var observer = function(event){
        _view.drawCanvas(event.detail.board);
    };

    _model.changeStateBoard.addSubscriber(observer)

    _view.addEvents();
    
    document.getElementById('field').addEventListener ('startLife', function(){
        _model.startLife();
    },false);
    document.getElementById('field').addEventListener ('stopLife', function(){
        _model.stopLife();
    },false);
    document.getElementById('field').addEventListener ('clearBoard', function(){
        _model.clearBoard();
    },false);
    document.getElementById('field').addEventListener ('changeSize', function(){
        _view.changeSize();
    },false);
    document.getElementById('field').addEventListener ('changeQuantityCell', function(){
        _model.changeQuantityCell(event.detail.n);
    },false);
    document.getElementById('field').addEventListener ('clickOnCell', function(event){
         _model.findCellAndChange(event.detail.x,event.detail.y,event.detail.width); 
    },false);
    document.getElementById('field').addEventListener ('changeSpeed', function(event){
         _model.changeSpeed(event.detail.speed); 
    },false);
}