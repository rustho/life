class changeStateBoard 
    {
        private _subscribers : any[] = [];
        addSubscriber(subs){
            this._subscribers.push(subs);
        };
        notifySubscribers(event) {
            
            for (let i=0; i<this._subscribers.length; i++){
                this._subscribers[i](event);
            }
        } 
    };
export default class  {
    
    private _width: number;
    private _height: number;
    private _timer:any;
    private _speed: number;
    private _board: number[][];
    readonly CELL_SQUARE= 20;
    public _changeStateBoard;

    constructor(){
        this._width=20;
        this._height=20;
        this._timer=false;
        this._speed=1000;
        this._board=this.newBoard() ;
        this._changeStateBoard=new changeStateBoard();
    };
    
    private newBoard (){
        let board=[] ;
        for(let i=0;i<this._height;i++){
            board[i]=[];
            for(let j=0;j<this._width;j++){
                board[i][j]=0;
            }
        }
        return board;
        };

    get getBoard(): number[][] {
            return this._board;
        };


    set setBoard(testboard: number[][]) {
            this._board = testboard
            this._height = testboard.length;
            this._width = testboard[0].length;
        };

    public _event()
    {
        let event = new CustomEvent('changeStateBoard', {
            bubbles:true,
            detail:{board:this._board}
            });
        return event;
        };

    public findCellAndChange (x,y):void  
    {
        let xCell= Math.floor(x/this.CELL_SQUARE);
        let yCell= Math.floor(y/this.CELL_SQUARE);
        if(this._board[yCell][xCell]===0)
            this._board[yCell][xCell]=1;
        else
            this._board[yCell][xCell]=0;
        this._changeStateBoard.notifySubscribers(this._event());
        };

    public changeStateOfCell (i,j) 
    {
        let livingcell=0;
        for(let il = i-1;il<=i+1;il++){
            for(let jl = j-1;jl<=j+1;jl++){
                let ii=il;
                let jj=jl;
                if (il===-1) ii=this._height-1; //проверка для моделирования поверхности тора
                if (jl===-1) jj=this._width-1;
                if (il===this._height) ii=0;
                if (jl===this._width) jj=0;
                if (this._board[ii][jj]===1) livingcell+=1;
            }
        }
        let res=0;
        if(this._board[i][j]===0 && livingcell===3) res=1;
        if (this._board[i][j]===1 && (livingcell===3 || livingcell===4)) res=1;
        return res;
        };

    public nextState(board) :void
    {
        let newboard : number[][]=[];
        for(let i=0;i<board.length;i++){
            newboard[i]=[];
            for(let j=0;j<board[0].length;j++){
                newboard[i][j]=0;
            }
        }
        for(let i=0;i<newboard.length;i++){
            for(let j=0;j<newboard[0].length;j++){
                newboard[i][j] = this.changeStateOfCell(i,j);
            }
        }
        this._board = newboard;
        this._changeStateBoard.notifySubscribers(this._event()) 
        }; 

    public startLife ()
    {
        var self = this;
        if (this._timer===false){
            this._timer = setInterval(function(){
            self.nextState(self._board);
            },this._speed);
        }
        };
    public stopLife ()
    {
        if (this._timer!==false){
            clearInterval(this._timer);
            this._timer = false
        }
        };
    set setSpeed(speed)
    {
        if (speed>0)
            {
                clearInterval(this._timer);
                this._timer = false;
                this._speed = speed;
                this.startLife()
            } 
        else
            console.log('mockerror')
        };

    set changeSpeed(speed){
        if (speed>0)
            this._speed = speed;
            this.stopLife();
            this.startLife();
        };
    public clearBoard ()
    {
            this._board = this.newBoard();
            this._changeStateBoard.notifySubscribers(this._event());
        };
    public changeQuantityCell (width,height)
    {
            this._width=Math.floor(width/this.CELL_SQUARE);
            this._height=Math.floor(height/this.CELL_SQUARE);
            this._board = this.newBoard();
            this._changeStateBoard.notifySubscribers(this._event());
        };
}