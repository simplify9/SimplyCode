import { Reducer } from "redux"
import { EditHistory, getHistoryInitState, historyRedo, historyUndo, historyUpdate } from "./editHistory"
import { applyChange, DocumentAction, getDocumentInitState, Model } from "./document"


export type UndoAction = {
    type: "UNDO"
}

export type RedoAction = {
    type: "REDO"
}

type IdeAction = DocumentAction | UndoAction | RedoAction

export type IdeState = {
    history: EditHistory<Model>
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
