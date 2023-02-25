import { applyAdd, applyRemove, applyUpdate, EntitySet, entitySet } from "./entitySet"

export type Named<T> = {
    name: string
} & T

export interface ExtenderType {
    kind: 'extender'
    fromType: string
}

export interface NumberType {
    kind: 'number'
    precision?: number
    min?: number
    max?: number
}

export interface TextType {
    kind: 'text'
    regex?: string
    minLength?: number
    maxLength?: number
}

export interface BooleanType {
    kind: 'boolean'
}

export interface DateType {
    kind: 'date'
    min?: string
    max?: string
}

export interface DateTimeType {
    kind: 'datetime'
    min?: string
    max?: string
}

export interface TimespanType {
    kind: 'timespan'
    min?: string
    max?: string
}

export type Property<T> = T & {
    isList?: boolean
    required?: boolean
    description?: string
}

export interface ObjectType {
    kind: 'object'
    isEntity: boolean
    properties: EntitySet<Named<Property<AnyType>>>
    includes: string[]
}

export interface GeoPointType {
    kind: 'geopoint'
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
    GeoPointType) & {
        description?: string
    }

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

export type UpdateTypeAction = {
    type: "UPDATE-TYPE"
    name: string
    data: Partial<AnyType>
}

export type RenameTypeAction = {
    type: "RENAME-TYPE"
    oldName: string
    newName: string
}

export type RemoveTypeAction = {
    type: "REMOVE-TYPE"
    name: string
}

export type AddPropertyAction = {
    type: "ADD-PROPERTY" 
    typeName: string
    name: string
    data: Property<AnyType>
}

export const addPropertyAction = (typeName: string, name: string, data: Property<AnyType>): AddPropertyAction => ({
    type: 'ADD-PROPERTY',
    typeName,
    name, 
    data
})

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

export type DocumentAction = AddTypeAction | UpdateTypeAction | RemoveTypeAction | AddRelationAction |
UpdateRelationAction | RemoveRelationAction | RenameTypeAction | AddPropertyAction

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
    else if (action.type === 'ADD-PROPERTY') {

        const objectDef = state.types.byKey[action.typeName];
        if (objectDef && objectDef.kind === 'object') {
            return {
                ...state,
                types: applyUpdate(state.types, action.typeName, {
                    ...objectDef,
                    properties: applyAdd(objectDef.properties, 
                        action.name, 
                        { 
                            name: action.name, 
                            ...action.data
                        })
                })
            }
        }

        
    }
    else if (action.type === 'UPDATE-TYPE') {
        const oldData = state.types.byKey[action.name];
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

export const humanFriendlyTypeName = (type: AnyType) => {

    if (type.kind === 'extender') {
        return type.fromType;
    }

    return names[type.kind];
}