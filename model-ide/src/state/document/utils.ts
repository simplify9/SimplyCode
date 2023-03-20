import { applyAdd, applyUpdate, applyRemove, entitySet } from "../entitySet"
import { AnyType, Document } from "./types"
import { DocumentAction } from "./actions"

export const getDocumentInitState = () => ({
    types: entitySet([], []),
    relations: entitySet([], []),
})

export const applyChange = (state: Document, action: DocumentAction): Document => {

    if (action.type === 'ADD-TYPE') {
        return {
            ...state,
            types: applyAdd(state.types, action.name, action.data)
        }
    }
    else if (action.type === 'ADD-RELATION') {
        return {
            ...state,
            relations: applyAdd(state.relations, action.name, action.data)
        }
    }
    else if (action.type === 'UPDATE-TYPE') {
        return {
            ...state,
            types: applyUpdate(state.types, action.name, action.data)
        }
    }
    else if (action.type === 'UPDATE-RELATION') {
        return {
            ...state,
            relations: applyUpdate(state.relations, action.name, action.data)
        }
    }
    else if (action.type === 'REMOVE-TYPE') {
        return {
            ...state,
            types: applyRemove(state.types, action.name)
        }
    }
    else if (action.type === 'REMOVE-RELATION') {
        return {
            ...state,
            relations: applyRemove(state.relations, action.name)
        }
    }

    return state;
}

const names = {
    number: 'Number',
    text: 'Text',
    date: 'Date',
    time: 'Time',
    datetime: 'Date and Time',
    boolean: 'Boolean',
    geopoint: 'Geo-Point',
    object: 'Object',
    timespan: 'Time Interval'
}

export const humanFriendlyTypeName = (type: { kind: AnyType['kind'], fromType?: string }) => {

    if (type.kind === 'extender') {
        return type.fromType;
    }

    return names[type.kind];
}

export const createTypeWithDefaults = 
    (kind: string, fromType?: string): AnyType => {

    if (kind === 'extender') {
        return {
            kind,
            fromType: fromType!,
            description: null
        }
    }
    else if (kind === 'object') {
        return {
            kind: 'object',
            isEntity: false,
            properties: entitySet([], []),
            includes: [],
            keyProperties: [],
            description: null
        }
    }
    else {
        return {
            kind: kind as any,
            description: null
        }
    }

}
