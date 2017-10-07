import EventEmiter from "../EventEmiter";
export interface IAbstractModel {
    eventEmiter: EventEmiter;
    changeQuantityCell: (width: number, height: number) => void;
    clearBoard: () => void;
    nextState: () => void;
    findCellAndChange: (x: number, y: number) => void;
}

export interface IModel extends IAbstractModel {
    changeStateOfCell: (i: number, j: number) => number;
    newBoard: () => number[][];
    getBoard: () => number[][];
}

