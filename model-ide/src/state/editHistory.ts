
export type EditHistory<TDocument> = {
    past: TDocument[]
    present: TDocument
    future: TDocument[]
    canUndo: boolean
    canRedo: boolean
}

export const getHistoryInitState = <TDocument>(document: TDocument): EditHistory<TDocument> => ({
    past: [],
    present: document,
    future: [],
    canUndo: false,
    canRedo: false
})

export const historyUpdate = <T>(state: EditHistory<T>, newState: T): EditHistory<T> => {

    const oldSnapshot = state.present;
    return {
        ...state,
        present: newState,
        canUndo: true,
        future: [],
        past: [
            oldSnapshot,
            ...state.past,
        ],
    }
}

export const historyUndo = <T>(state: EditHistory<T>): EditHistory<T> => {

    const [present, ...past] = state.past;
    return {
        ...state,
        present,
        past,
        canUndo: past.length > 0,
        canRedo: true,
        future: [
            state.present,
            ...state.future
        ]
    }
}

export const historyRedo = <T>(state: EditHistory<T>): EditHistory<T> => {
    
    const [present, ...future] = state.future;
    return {
        ...state,
        present,
        future,
        canUndo: true,
        canRedo: future.length > 0,
        past: [
            state.present,
            ...state.past
        ]
    }
}