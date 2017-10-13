export interface IAbstractModel {
    subscribe: (eventName: string, fn) => void;
    changeQuantityCell: (width: number, height: number) => void;
    clearBoard: () => void;
    nextState: () => void;
    findCellAndChange: (x: number, y: number) => void;
}

export interface IModel extends IAbstractModel {
    emit: (eventName: string, ...data) => void;
    changeStateOfCell: (i: number, j: number) => number;
    newBoard: () => number[][];
    getBoard: () => number[][];
}

