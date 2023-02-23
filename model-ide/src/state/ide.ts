import { Reducer } from "redux"
import { EditHistory, getHistoryInitState, historyRedo, historyUndo, historyUpdate } from "./editHistory"
import { applyChange, DocumentAction, getDocumentInitState, Document } from "./document"
import { useSelector } from "react-redux"


export type UndoAction = {
    type: "UNDO"
}

export type RedoAction = {
    type: "REDO"
}

type IdeAction = DocumentAction | UndoAction | RedoAction

export type IdeState = {
    history: EditHistory<Document>
}

const initState: IdeState = {
    history: getHistoryInitState(
        getDocumentInitState()
    )
}

export const ideReducer: Reducer<IdeState, IdeAction> = (state = initState, action) => {

    if (action.type === 'UNDO') {
        return {
            ...state, 
            history: historyUndo(state.history)
        }
    }
    else if (action.type === 'REDO') {
        return {
            ...state, 
            history: historyRedo(state.history)
        }
    }
    else {
        // --> DOCUMENT ACTION
        const oldState = state.history.present;
        const updatedState = applyChange(oldState, action);
        if (updatedState !== oldState) {
            return {
                ...state, 
                history: historyUpdate(state.history, updatedState)
            }
        }
    }

    return state;
}

export const useModelTypes = () => {

    const types = useSelector((s: IdeState) => s.history.present.types);

    return types.keys.map(k => ({
        name: k,
        ...types.byKey[k]
    }))
}
