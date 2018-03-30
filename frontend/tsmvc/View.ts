import * as $ from 'jquery';
import binding from './binding';
import ErrorCanvas from './ErrorCanvas';
import EventEmiter from './EventEmiter';
import { IView } from './types/IView';

import * as config from './config/config.json';

export default class View extends EventEmiter implements IView {
  public $field: JQuery<HTMLElement>;
  public $start: JQuery<HTMLElement>;
  private $stop: JQuery<HTMLElement>;
  private $clear: JQuery<HTMLElement>;
  private $changeHeight: JQuery<HTMLElement>;
  private $changeWidth: JQuery<HTMLElement>;
  private $changePeriod: JQuery<HTMLElement>;
  private $status: JQuery<HTMLElement>;
  private CELL_SQUARE: number;

  constructor() {
    super();
    this.CELL_SQUARE = config.CELL_SQUARE;
    this.findingElements();
    this.addEvents();
    binding(this);
  }
  public endGame(): void {
    this.$status.text('END GAME');
    this.emit('stopLife');
  }
  public changeSize(width: number, height: number): void {
    const canvas = this.$field.get(0) as HTMLCanvasElement;
    canvas.width = width*this.CELL_SQUARE;
    canvas.height = height*this.CELL_SQUARE;
  }
  public drawCanvas(board: number[][]): void {
    const canvas = this.$field.get(0) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const cellSquare = this.CELL_SQUARE;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board.forEach((row, indexOfRow) => {
      row.forEach((element, indexOfColl) => {
        if (board[indexOfRow][indexOfColl] === 1) {
          ctx.fillRect(indexOfColl * cellSquare, indexOfRow * cellSquare, cellSquare, cellSquare);
        }
        if (board[indexOfRow][indexOfColl] === 0) {
          ctx.strokeRect(indexOfColl * cellSquare, indexOfRow * cellSquare, cellSquare, cellSquare);
        }
      });
    });
  }
  private changeStatusGame(text: string): void {
    this.$status.text(text);
  }
  private findingElements(): void {
    this.$start = $('.js-start');
    this.$stop = $('.js-stop');
    this.$clear = $('.js-clear');
    this.$changeWidth = $('.js-change_width');
    this.$changeHeight = $('.js-change_height');
    this.$changePeriod = $('.js-change_speed');
    this.$status = $('.js-status');
    if (!$('.js-field')[1]) {
      this.$field = $('.js-field');
    } else {
      const errorCanvas = new ErrorCanvas();
      throw(errorCanvas);
    }
  }
  private addEvents(): void {
    this.$start.click({ view: this }, this.startLife);
    this.$stop.click({ view: this }, this.stopLife);
    this.$clear.click({ view: this }, this.clearBoard);
    this.$changeWidth.blur({ view: this }, this.changeWidth);
    this.$changeHeight.blur({ view: this }, this.changeHeight);
    this.$changePeriod.click({ view: this }, this.changePeriod);
    this.$field.first().off('click').on('click', { view: this }, this.clickCell);
  }
  private startLife(event: JQuery.Event<HTMLElement, {view}>): void {
    event.data.view.changeStatusGame('Game Begin');
    event.data.view.emit('startLife');
  }
  private stopLife(event: JQuery.Event<HTMLElement, {view}>): void {
    event.data.view.changeStatusGame('Game is stopped');
    event.data.view.emit('stopLife');
  }
  private clearBoard(event: JQuery.Event<HTMLElement, {view}>): void {
    event.data.view.emit('clearBoard');
    event.data.view.emit('stopLife');
    event.data.view.changeStatusGame("it's a new life for you");
  }
  private changeWidth(event: JQuery.Event<HTMLElement, {view}>): void {
    const width = parseInt(event.data.view.$changeWidth.val(), 10);
    const height = event.data.view.$field.height()/event.data.view.CELL_SQUARE;
    event.data.view.emit('changeWidth', width, height);
    event.data.view.changeStatusGame('Resizing game');
    event.data.view.emit('stopLife');
  }
  private changeHeight(event: JQuery.Event<HTMLElement, {view}>): void {
    const height = parseInt(event.data.view.$changeHeight.val(), 10);
    const width = event.data.view.$field.width()/event.data.view.CELL_SQUARE;
    event.data.view.emit('changeHeight', width, height);
    event.data.view.changeStatusGame('Resizing game');
    event.data.view.emit('stopLife');
  }
  private changePeriod(event: JQuery.Event<HTMLElement, {view}>): void {
    let userText = (prompt('period in millisecond?', '500'));
    let period: number = 0;
    userText = (userText === null) ? '100' : userText;
    period = parseInt((userText), 10);
    event.data.view.emit('changePeriod', period);
    event.data.view.changeStatusGame('Speed is changed');
  }

  private clickCell(event: JQuery.Event<HTMLElement, {view}>): void {
    const x = Math.floor(event.offsetX/event.data.view.CELL_SQUARE);
    const y = Math.floor(event.offsetY/event.data.view.CELL_SQUARE);
    event.data.view.emit('clickCell', x, y);
  }
}

