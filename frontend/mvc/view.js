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
            changeSize();
        },
        
        addEvents:function(){
            addEvents();
        },

        drawCanvas: function(board){
            drawCanvas(board);
        }
    }
 }