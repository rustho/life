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