export interface IAbstractView {
  subscribe: (eventName: string, fn) => void;
  changeSize: (width: number, height: number) => void;
  drawCanvas: (board: number[][]) => void;
  endGame: () => void;
}
export interface IView extends IAbstractView {
  emit: (eventName: string, ...data) => void;
}


