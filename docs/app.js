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
	})

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = function() {
	    
	    var _n=5;
	    var _timer;
	    var _speed = 1000;
	    var newBoard = function(n){
	        var board=[] ;
	        for(var i=0;i<n;i++){
	            board[i]=[];
	            for(var j=0;j<n;j++){
	                board[i][j]=0;
	            }
	        }
	        return board;
	    }

	    var _board=newBoard(_n) ;

	    var changeStateBoard = function () {
	        var event = new CustomEvent('changeStateBoard', {
	                bubbles:true,
	                detail:{board:_board}
	            })  
	        return event;  
	    }

	    var findCellAndChange = function (x,y,width) {
	        var cell = width/_n;
	        var xCell= Math.ceil(x/cell)-1;
	        var yCell= Math.ceil(y/cell)-1;
	        console.log(xCell+yCell);
	        if(_board[xCell][yCell]===0)
	            _board[xCell][yCell]=1;
	        else
	            _board[xCell][yCell]=0;
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
	        _timer = setInterval(function(){
	        _board = nextState(_board);
	        document.getElementById('field').dispatchEvent(changeStateBoard());
	        },speed);
	    }

	    return {
	        getBoard: function() {
	            return _board;
	        },
	        startLife: function(){
	            startLife(_speed);
	        },
	        stopLife: function(){
	            clearInterval(_timer);
	        },
	        clearLife:function(){
	            _board = newBoard(_n);
	            document.getElementById('field').dispatchEvent(changeStateBoard());
	        },
	        changeQuantityCell:function(n){
	            _n = n;
	            _board = newBoard(_n);
	            document.getElementById('field').dispatchEvent(changeStateBoard());
	        },
	        findCellAndChange:function(x,y,width){
	            findCellAndChange(x,y,width);
	            document.getElementById('field').dispatchEvent(changeStateBoard());
	        },
	        changeSpeed: function(speed) {
	            clearInterval(_timer);
	            _speed = speed;
	            startLife(speed);
	        }
	    }

	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = function() {
	        
	    var addEvents = function(){
	        document.getElementById('start').onclick = function(){
	            var startLife = new CustomEvent('startLife', {bubbles:true,})
	            document.getElementById('field').dispatchEvent(startLife);
	        };

	        document.getElementById('stop').onclick = function(){
	            var stopLife = new CustomEvent('stopLife', {bubbles:true,})
	            document.getElementById('field').dispatchEvent(stopLife);
	        };

	        document.getElementById('clear').onclick = function(){
	            var clearBoard = new CustomEvent('clearBoard', {bubbles:true,})
	            document.getElementById('field').dispatchEvent(clearBoard);
	        };

	        document.getElementById('change_size').onclick = function() {
	            var changeSize = new CustomEvent('changeSize', {bubbles:true,})
	            document.getElementById('field').dispatchEvent(changeSize);

	        };

	        document.getElementById('change_cell').onclick = function() {
	            var n = parseInt(prompt('cells?',20)); 
	            var changeQuantityCell = new CustomEvent('changeQuantityCell', {
	                bubbles:true,
	                detail:{n:n}
	            })
	            document.getElementById('field').dispatchEvent(changeQuantityCell);
	        };

	        document.getElementById('change_speed').onclick = function() {
	            var speed = parseInt(prompt('speed in mlsec?',500));
	            var changeSpeed = new CustomEvent('changeSpeed', {
	                bubbles:true,
	                detail:{speed:speed}
	            })
	            document.getElementById('field').dispatchEvent(changeSpeed);
	        };
	        
	        document.getElementById('field').onclick = function(e) {
	            var x = e.pageX ;
	            var xo= this.offsetLeft;
	            var y = e.pageY ;
	            var yo= this.offsetTop;
	            var width = document.getElementById('field').width;
	            var clickOnCell = new CustomEvent('clickOnCell', {
	                bubbles:true,
	                detail:{x:x-xo,y:y-yo,width:width}
	            })
	            document.getElementById('field').dispatchEvent(clickOnCell); 
	        }; 
	    }
	    
	    var changeSize = function () {
	        var width = parseInt(prompt('width?',500));
	        var canvas = document.getElementById('field');
	        canvas.width = width;
	        canvas.height = width;
	    }

	    var drawCanvas = function(board){
	        var canvas = document.getElementById('field');
	        ctx = canvas.getContext('2d');
	        var n = board.length;
	        var cellsquare = canvas.width / n;
	        ctx.clearRect(0,0,canvas.width,canvas.height);
	        for (var i=0; i<n;i++){
	            for(var j=0;j<n;j++){
	                if(board[i][j]===1)
	                    ctx.fillRect(i*cellsquare,j*cellsquare,cellsquare,cellsquare)
	                if(board[i][j]===0)
	                    ctx.strokeRect(i*cellsquare,j*cellsquare,cellsquare,cellsquare)
	            }
	        }
	    }

	    return {

	        changeSize:function(){
	            changeSize(width);
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
	        _view.changeSize;
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

/***/ })
/******/ ]);