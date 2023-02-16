export interface CustomArgs {
    type: string
}

export interface NumberArgs {
    precision?: number
    min?: number
    max?: number
}

export interface TextArgs {
    regex?: string
    minLength?: number
    maxLength?: number
}

export interface BooleanArgs {

}

export type Property<T> = {
    required: boolean
} & T

export interface ObjectArgs {
    properties: Record<string, Property<DataType>>
}

export interface DateArgs {

}

export interface DateTimeArgs {

}

export interface TimeArgs {

}

export interface TimeSpanArgs {

}

export type Types = {
    number: NumberArgs
    text: TextArgs
    boolean: BooleanArgs
    object: ObjectArgs
    date: DateArgs
    dateTime: DateTimeArgs
    time: TimeArgs
    timeSpan: TimeSpanArgs
    custom: CustomArgs
}

export type DataType<T extends keyof Types = keyof Types> = { base: T } & Types[T]

export type RelationEnd = {
    typeName: string
    property: string
    many: boolean
}

export type Relation = {
    left: RelationEnd
    right: RelationEnd
}

export type Model = {
    types: Record<string, DataType>
    relations: Relation[]
}

export type AddTypeAction = {
    type: "ADD-TYPE"
    name: string
    data: DataType
}

export type UpdateTypeAction = {
    type: "UPDATE-TYPE"
    name: string
    data: Partial<DataType>
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

export type AddRelationAction = {
    type: "ADD-RELATION"
    data: Relation
}

export type UpdateRelationAction = {
    type: "UPDATE-RELATION"
    leftProperty: string
    rightProperty: string
    leftType: string
    rightType: string
    data: Partial<Relation>
}

export type RemoveRelationAction = {
    type: "REMOVE-RELATION"
    leftProperty: string
    rightProperty: string
    leftType: string
    rightType: string
}

export type DocumentAction = AddTypeAction | UpdateTypeAction | RemoveTypeAction | AddRelationAction |
UpdateRelationAction | RemoveRelationAction | RenameTypeAction

export const getDocumentInitState = () => ({
    types: {},
    relations: []
})

type RelationKey = {
    leftProperty: string
    rightProperty: string
    leftType: string
    rightType: string
}

const isTheSameRelation = (r: Relation, key: RelationKey) => (
    r.left.property === key.leftProperty &&
    r.left.typeName === key.leftType &&
    r.right.property === key.rightProperty &&
    r.right.typeName === key.rightType
);

export const applyChange = (state: Model, action: DocumentAction): Model => {

    if (action.type === 'ADD-TYPE') {
        return {
            ...state,
            types: {
                ...state.types,
                [action.name]: action.data
            }
        }
    }
    else if (action.type === 'ADD-RELATION') {
        return {
            ...state,
            relations: [
                ...state.relations,
                action.data
            ]
        }
    }
    else if (action.type === 'UPDATE-TYPE') {
        const oldData = state.types[action.name];
        return {
            ...state,
            types: {
                ...state.types,
                [action.name]: {
                    ...oldData,
                    ...action.data
                }
            }
        }
    }
    else if (action.type === 'UPDATE-RELATION') {
        return {
            ...state,
            relations: state.relations.map(r => 
                isTheSameRelation(r, action)
                ? {
                    ...r,
                    ...action.data
                }
                : r)
        }
    }
    else if (action.type === 'REMOVE-TYPE') {
        const { [action.name]: _, ...types } = state.types;
        return {
            ...state,
            types
        }
    }
    else if (action.type === 'REMOVE-RELATION') {
        return {
            ...state,
            relations: state.relations.filter(r => !isTheSameRelation(r, action))
        }
    }

    return state;
}
