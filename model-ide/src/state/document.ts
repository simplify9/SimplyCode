import { applyAdd, applyRemove, applyUpdate, EntitySet, entitySet } from "./entitySet"

export type Named<T> = {
    name: string
} & T

export interface ExtenderType {
    kind: 'extender'
    fromType: string
    description: string | null
}

export interface NumberType {
    kind: 'number'
    precision: number
    min?: number
    max?: number
    description: string | null
}

export interface TextType {
    kind: 'text'
    regex?: string
    minLength?: number
    maxLength?: number
    description: string | null
}

export interface BooleanType {
    kind: 'boolean'
    description: string | null
}

export interface DateType {
    kind: 'date'
    min?: string
    max?: string
    description: string | null
}

export interface DateTimeType {
    kind: 'datetime'
    min?: string
    max?: string
    description: string | null
}

export interface TimespanType {
    kind: 'timespan'
    min?: string
    max?: string
    description: string | null
}

export type Property<T> = T & {
    isList: boolean
    required: boolean
    description: string | null
}

export interface ObjectType {
    kind: 'object'
    isEntity: boolean
    properties: EntitySet<Named<Property<AnyType>>>
    includes: string[]
    description: string | null
}

export interface GeoPointType {
    kind: 'geopoint'
    description: string | null
}

export type AnyType = (
    ExtenderType |
    NumberType |
    TextType |
    BooleanType |
    DateType |
    DateTimeType |
    TimespanType |
    ObjectType |
    GeoPointType)

export type RelationEnd = {
    typeName: string
    property: string
    many: boolean
}

export type Relation = {
    left: RelationEnd
    right: RelationEnd
}

export type Document = {
    types: EntitySet<AnyType>
    relations: EntitySet<Relation>
}

export type AddTypeAction = {
    type: "ADD-TYPE"
    name: string
    data: AnyType
}

export const addTypeAction = (name: string, data: AnyType): AddTypeAction => ({
    type: 'ADD-TYPE',
    name, 
    data
})

export type PatchTypeAction = {
    type: "UPDATE-TYPE"
    name: string
    data: Partial<AnyType>
}

export const updateTypeAction = (name: string, data: Partial<AnyType>): PatchTypeAction => ({
    type: 'UPDATE-TYPE',
    name,
    data
})

export type RenameTypeAction = {
    type: "RENAME-TYPE"
    oldName: string
    newName: string
}

export type RemoveTypeAction = {
    type: "REMOVE-TYPE"
    name: string
}

export type AddRelationAction = {
    type: "ADD-RELATION"
    name: string
    data: Relation
}

export type UpdateRelationAction = {
    type: "UPDATE-RELATION"
    name: string
    data: Partial<Relation>
}

export type RemoveRelationAction = {
    type: "REMOVE-RELATION"
    name: string
}

export type DocumentAction = 
    AddTypeAction | 
    PatchTypeAction | 
    RemoveTypeAction | 
    AddRelationAction |
    UpdateRelationAction | 
    RemoveRelationAction | 
    RenameTypeAction

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
