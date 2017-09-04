export default function(model,view) {
    let _model = model;
    let _view = view;
    
    var modelObserver = function(event){
        _view.drawCanvas(event.detail.board);
    };

    _model._changeStateBoard.addSubscriber(modelObserver);

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
            case 'changeHeight':
                _view.changeSize(event.detail.width,event.detail.height);
                _model.changeQuantityCell(event.detail.width,event.detail.height);
                break;
            case 'changeWidth':
                _view.changeSize(event.detail.width,event.detail.height);
                _model.changeQuantityCell(event.detail.width,event.detail.height);
                break;
            case 'clickOnCell':
                _model.findCellAndChange(event.detail.x,event.detail.y);
                break;
            case 'changeSpeed':
                _model.changeSpeed=event.detail.speed; 
                break;
        }
    }

    _view._publisher.addSubscriber(viewObserver);
    
}