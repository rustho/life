module.exports = function(model,view) {
    _model = model;
    _view = view;

    _view.addEvents();

    document.getElementById('field').addEventListener ('startLife', function(){
        _model.startLife();
    },false);
    document.getElementById('field').addEventListener ('stopLife', function(){
        _model.stopLife();
    },false);
    document.getElementById('field').addEventListener ('clear', function(){
        _model.clear();
    },false);
    document.getElementById('field').addEventListener ('changeStateBoard', function(event){
        _view.drawCanvas(event.detail.board);
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