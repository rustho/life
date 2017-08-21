module.exports = function() {
    
    var _n=5;
    var _timer=false;
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
        if (_timer===false){
            _timer = setInterval(function(){
            _board = nextState(_board);
            document.getElementById('field').dispatchEvent(changeStateBoard());
            },speed);
        }
    }

    return {
        getBoard: function() {
            return _board;
        },
        setBoard: function(testboard){
            _board = testboard
            _n = testboard.length;
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