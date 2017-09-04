import * as $ from 'jquery';
export default class {
    
    _publisher =  {
        _subscribers : [],
        addSubscriber(object){
            this._subscribers.push(object);
        },
        notifySubscribers (event) {
            for (var i=0; i<this._subscribers.length; i++){
                this._subscribers[i](event);
            }
        } 
    };
    public addEvents() {
        let _publisher = this._publisher;

        $('#start').click ( function(){
            var startLife = new CustomEvent('startLife', {bubbles:true,})
            _publisher.notifySubscribers(startLife);
        });

        $('#stop').click ( function(){
            var stopLife = new CustomEvent('stopLife', {bubbles:true,})
            _publisher.notifySubscribers(stopLife);
        });

        $('#clear').click ( function(){
            var clearBoard = new CustomEvent('clearBoard', {bubbles:true,})
            _publisher.notifySubscribers(clearBoard);
        });

        $('#change_width').blur( function() {
            var width = parseInt($('#change_width').val().toString());
            var height = $('#field').height();
            var changeWidth = new CustomEvent('changeWidth', {
                bubbles:true,
                detail:{width:width,height:height}
            })
            _publisher.notifySubscribers(changeWidth);

        });

        $('#change_height').blur( function() {
            var height = parseInt($('#change_height').val().toString());
            var width = $('#field').width();
            var changeHeight = new CustomEvent('changeHeight', {
                bubbles:true,
                detail:{width:width,height:height}
            })
            _publisher.notifySubscribers(changeHeight);
        });

        $('#change_speed').click ( function() {
            var speed = parseInt(prompt('speed in mlsec?', '500'));
            var changeSpeed = new CustomEvent('changeSpeed', {
                bubbles:true,
                detail:{speed:speed}
            })
            _publisher.notifySubscribers(changeSpeed);
        });
        
        $('#field').click ( function(e) {
            var x = e.pageX ;
            var xo= this.offsetLeft;
            var y = e.pageY ;
            var yo= this.offsetTop;
            var width = $('#field').width;
            var clickOnCell = new CustomEvent('clickOnCell', {
                bubbles:true,
                detail:{x:x-xo,y:y-yo,}
            })
            _publisher.notifySubscribers(clickOnCell); 
        }); 
    }
    
    
    public changeSize (width,height) {
        var canvas = <HTMLCanvasElement> $('#field').get(0);
        canvas.width=width;
        canvas.height= height;;
    }

    public drawCanvas (board){
        var canvas = <HTMLCanvasElement> $('#field').get(0);
        var ctx = canvas.getContext("2d");
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

 }