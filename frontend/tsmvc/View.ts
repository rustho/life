import * as $ from 'jquery';
import binding from './binding';
import ErrorCanvas from './ErrorCanvas';
import EventEmiter from './EventEmiter';
import { IView } from './types/IView';

export default class View extends EventEmiter implements IView {
  public $field: JQuery<HTMLElement>;
  public $start: JQuery<HTMLElement>;
  private $stop: JQuery<HTMLElement>;
  private $clear: JQuery<HTMLElement>;
  private $changeHeight: JQuery<HTMLElement>;
  private $changeWidth: JQuery<HTMLElement>;
  private $changePeriod: JQuery<HTMLElement>;

  constructor() {
    super();
    this.findingElements();
    this.addEvents();
    binding(this);
  }

  public changeSize(width: number, height: number): void {
    const canvas = this.$field.get(0) as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;
  }
  public drawCanvas(board: number[][]): void {
    const canvas = this.$field.get(0) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const cellSquare = 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board.forEach((row, indexOfRow) => {
      board.forEach((element, indexOfColl) => {
        if (board[indexOfRow][indexOfColl] === 1) {
          ctx.fillRect(indexOfColl * cellSquare, indexOfRow * cellSquare, cellSquare, cellSquare);
        }
        if (board[indexOfRow][indexOfColl] === 0) {
          ctx.strokeRect(indexOfColl * cellSquare, indexOfRow * cellSquare, cellSquare, cellSquare);
        }
      });
    });
  }
  private findingElements(): void {
    this.$start = $('.js-start');
    this.$stop = $('.js-stop');
    this.$clear = $('.js-clear');
    this.$changeWidth = $('.js-change_width');
    this.$changeHeight = $('.js-change_height');
    this.$changePeriod = $('.js-change_speed');
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
    event.data.view.emit('startLife');
  }
  private stopLife(event: JQuery.Event<HTMLElement, {view}>): void {
    event.data.view.emit('stopLife');
  }
  private clearBoard(event: JQuery.Event<HTMLElement, {view}>): void {
    event.data.view.emit('clearBoard');
  }
  private changeWidth(event: JQuery.Event<HTMLElement, {view}>): void {
    const width = parseInt(event.data.view.$changeWidth.val(), 10);
    const height = event.data.view.$field.height();
    event.data.view.emit('changeWidth', width, height);
  }
  private changeHeight(event: JQuery.Event<HTMLElement, {view}>): void {
    const height = parseInt(event.data.view.$changeHeight.val(), 10);
    const width = event.data.view.$field.width();
    event.data.view.emit('changeHeight', width, height);
  }
  private changePeriod(event: JQuery.Event<HTMLElement, {view}>): void {
    let userText = (prompt('period in ml/sec?', '500'));
    let period: number = 0;
    userText = (userText === null) ? '100' : userText;
    period = parseInt((userText), 10);

    event.data.view.emit('changePeriod', period);
  }

  private clickCell(event: JQuery.Event<HTMLElement, {view}>): void {
    const x = event.offsetX;
    const y = event.offsetY;
    event.data.view.emit('clickCell', x, y);
  }
}

