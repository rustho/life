/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Model = __webpack_require__ (1);
	const View = __webpack_require__ (2);
	const Controller = __webpack_require__ (3);

	document.addEventListener("DOMContentLoaded",function(){
	    var model = Model();
	    var view = View();
	    var controller = Controller(model,view);
	    /* model.startLife(); */
	})

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = function() {
	    
	    var _width=5;
	    var _height=5;
	    var _timer=false;
	    var _speed = 1000;
	    var _cellSquare= 20;
	    var newBoard = function(){
	        var board=[] ;
	        for(var i=0;i<_height;i++){
	            board[i]=[];
	            for(var j=0;j<_width;j++){
	                board[i][j]=0;
	            }
	        }
	        return board;
	    }

	    var _board=newBoard() ;

	    var _event = function(){
	    var event = new CustomEvent('changeStateBoard', {
	                bubbles:true,
	                detail:{board:_board}
	            });
	    return event;
	    };

	    var _changeStateBoard =  {
	        _subscribers : [],
	        addSubscriber : function(object){
	            this._subscribers.push(object);
	        },
	        notifySubscribers : function() {
	            for (var i=0; i<this._subscribers.length; i++){
	                this._subscribers[i](_event());
	            }
	        } 
	    };

	    var findCellAndChange = function (x,y) {
	        var xCell= Math.floor(x/_cellSquare);
	        var yCell= Math.floor(y/_cellSquare);
	        if(_board[yCell][xCell]===0)
	            _board[yCell][xCell]=1;
	        else
	            _board[yCell][xCell]=0;
	    };

	    var changeStateOfCell = function(board,i,j) {
	        var livingcell=0;
	        var n = board.length;
	        for(var il = i-1;il<=i+1;il++){
	            for(var jl = j-1;jl<=j+1;jl++){
	                var ii=il;
	                var jj=jl;
	                if (il===-1) ii=n-1; //проверка для моделирования поверхности тора
	                if (jl===-1) jj=n-1;
	                if (il===n) ii=0;
	                if (jl===n) jj=0;
	                if (board[ii][jj]===1) livingcell+=1;
	            }
	        }
	        var res=0;
	        if(board[i][j]===0 && livingcell===3) res=1;
	        if (board[i][j]===1 && (livingcell===3 || livingcell===4)) res=1;
	        return res;
	    }

	    var nextState = function (board){
	        var newboard= [];
	        for(var i=0;i<board.length;i++){
	            newboard[i]=[];
	            for(var j=0;j<board.length;j++){
	                newboard[i][j]=0;
	            }
	        }
	        for(var i=0;i<board.length;i++){
	            for(var j=0;j<board.length;j++){
	                newboard[i][j] = changeStateOfCell(board,i,j);
	            }
	        }
	        return newboard; 
	    }; 

	    var startLife = function (speed) {
	        if (_timer===false){
	            _timer = setInterval(function(){
	            _board = nextState(_board);
	            _changeStateBoard.notifySubscribers();
	            },speed);
	        }
	    }

	    return {
	        changeStateBoard: _changeStateBoard,
	        getBoard: function() {
	            return _board;
	        },
	        setBoard: function(testboard){
	            _board = testboard
	            _n = testboard.length;
	        },
	        nextState: function(testboard){
	            return nextState(testboard);
	            _changeStateBoard.notifySubscribers(); //можно реализовать кнопку перехода в следующее состояние
	        },
	        startLife: function(){
	            startLife(_speed);
	        },
	        stopLife: function(){
	            clearInterval(_timer);
	            _timer = false;
	        },
	        clearBoard:function(){
	            _board = newBoard(_n);
	            _changeStateBoard.notifySubscribers();
	        },
	        changeQuantityCell:function(width,height){
	            _width=Math.floor(width/_cellSquare);
	            _height=Math.floor(height/_cellSquare);
	            _board = newBoard();
	            _changeStateBoard.notifySubscribers();
	        },
	        findCellAndChange:function(x,y){
	            findCellAndChange(x,y);
	            _changeStateBoard.notifySubscribers();
	        },
	        changeSpeed: function(speed) {
	            clearInterval(_timer);
	            _timer = false;
	            _speed = speed;
	            startLife(speed);
	        }
	    }

	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = function() {
	    var _publisher =  {
	        _subscribers : [],
	        addSubscriber : function(object){
	            this._subscribers.push(object);
	        },
	        notifySubscribers : function(event) {
	            for (var i=0; i<this._subscribers.length; i++){
	                this._subscribers[i](event);
	            }
	        } 
	    };
	        
	    var addEvents = function(){
	        document.getElementById('start').onclick = function(){
	            var startLife = new CustomEvent('startLife', {bubbles:true,})
	            _publisher.notifySubscribers(startLife);
	        };

	        document.getElementById('stop').onclick = function(){
	            var stopLife = new CustomEvent('stopLife', {bubbles:true,})
	            _publisher.notifySubscribers(stopLife);
	        };

	        document.getElementById('clear').onclick = function(){
	            var clearBoard = new CustomEvent('clearBoard', {bubbles:true,})
	            _publisher.notifySubscribers(clearBoard);
	        };

	        document.getElementById('change_width').onblur = function() {
	            var width = parseInt(document.getElementById('change_width').value);
	            console.log(width);
	            var height = document.getElementById('field').height;
	            console.log(height);
	            var changeWidth = new CustomEvent('changeWidth', {
	                bubbles:true,
	                detail:{width:width,height:height}
	            })
	            _publisher.notifySubscribers(changeWidth);

	        };

	        document.getElementById('change_height').onblur = function() {
	            var height = parseInt(document.getElementById('change_height').value);
	            var width = document.getElementById('field').width;
	            var changeHeight = new CustomEvent('changeHeight', {
	                bubbles:true,
	                detail:{width:width,height:height}
	            })
	            _publisher.notifySubscribers(changeHeight);
	        };

	        document.getElementById('change_speed').onclick = function() {
	            var speed = parseInt(prompt('speed in mlsec?',500));
	            var changeSpeed = new CustomEvent('changeSpeed', {
	                bubbles:true,
	                detail:{speed:speed}
	            })
	            _publisher.notifySubscribers(changeSpeed);
	        };
	        
	        document.getElementById('field').onclick = function(e) {
	            var x = e.pageX ;
	            var xo= this.offsetLeft;
	            var y = e.pageY ;
	            var yo= this.offsetTop;
	            var width = document.getElementById('field').width;
	            var clickOnCell = new CustomEvent('clickOnCell', {
	                bubbles:true,
	                detail:{x:x-xo,y:y-yo,}
	            })
	            _publisher.notifySubscribers(clickOnCell); 
	        }; 
	    }
	    
	    var changeSize = function (width,height) {
	        var canvas = document.getElementById('field');
	        canvas.width = width;
	        canvas.height = height;
	    }

	    var drawCanvas = function(board){
	        var canvas = document.getElementById('field');
	        ctx = canvas.getContext('2d');
	        var height = board.length;
	        var width = board[0].length;
	        var cellsquare = 20;
	        ctx.clearRect(0,0,canvas.width,canvas.height);
	        for (var i=0; i<height;i++){
	            for(var j=0;j<width;j++){
	                if(board[i][j]===1)
	                    ctx.fillRect(j*cellsquare,i*cellsquare,cellsquare,cellsquare)
	                if(board[i][j]===0)
	                    ctx.strokeRect(j*cellsquare,i*cellsquare,cellsquare,cellsquare)
	            }
	        }
	    }

	    return {
	        
	        publisher:_publisher,

	        changeSize:function(width,height){
	            changeSize(width,height);
	        },
	        
	        addEvents:function(){
	            addEvents();
	        },

	        drawCanvas: function(board){
	            drawCanvas(board);
	        }
	    }
	 }

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
	            case 'changeHeight':
	                _view.changeSize(event.detail.width,event.detail.height);
	                _model.changeQuantityCell(event.detail.width,event.detail.height);
	                console.log('height')
	                break;
	            case 'changeWidth':
	                _view.changeSize(event.detail.width,event.detail.height);
	                _model.changeQuantityCell(event.detail.width,event.detail.height);
	                console.log('width')
	                break;
	            case 'clickOnCell':
	                _model.findCellAndChange(event.detail.x,event.detail.y);
	                break;
	            case 'changeSpeed':
	                _model.changeSpeed(event.detail.speed); 
	                break;
	        }
	    }

	    _view.publisher.addSubscriber(viewObserver);
	    
	}

/***/ })
/******/ ]);