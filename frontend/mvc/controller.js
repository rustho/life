module.exports = function(model,view) {
    _model = model;
    _view = view;
    
    var modelObserver = function(event){
        _view.drawCanvas(event.detail.board);
    };

    _model.changeStateBoard.addSubscriber(modelObserver)

    _view.addEvents();
    
    var viewObserver = function(event){
        switch(event.type){
            case 'startLife':
                _model.startLife();
                break;
            case 'stopLife':
                _model.stopLife();
                break;
            case 'clearBoard':
                _model.clearBoard();
                break;
            case 'changeSize':
                _view.changeSize();
                break;
            case 'changeQuantityCell':
                _model.changeQuantityCell(event.detail.n);
                break;
            case 'clickOnCell':
                _model.findCellAndChange(event.detail.x,event.detail.y,event.detail.width);
                break;
            case 'changeSpeed':
                _model.changeSpeed(event.detail.speed); 
                break;
        }
    }

    _view.publisher.addSubscriber(viewObserver);
    
}