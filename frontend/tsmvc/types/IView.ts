import EventEmiter from "../EventEmiter";
export interface IAbstractView {
    eventEmiter: EventEmiter;
    changeSize: (width: number, height: number) => void;
    drawCanvas: (board: number[][]) => void;
}


