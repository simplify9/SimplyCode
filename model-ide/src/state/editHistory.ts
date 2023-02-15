

export type EditHistory<TDocument> = {
    past: TDocument[]
    present: TDocument
    future: TDocument[]
}

export const getHistoryInitState = <TDocument>(document: TDocument): EditHistory<TDocument> => {
    return {
        past: [],
        present: document,
        future: []
    }
}

export const update = <T>(state: EditHistory<T>, newState: T): EditHistory<T> => {
    return state;
}

export const undo = <T>(state: EditHistory<T>): EditHistory<T> => {
    return state;
}

export const redo = <T>(state: EditHistory<T>): EditHistory<T> => {
    return state;
}