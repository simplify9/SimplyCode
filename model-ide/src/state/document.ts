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

// export type NamedDataType<T extends keyof Types = keyof Types> = {
//     name: string
// } & DataType<T>

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
    data: Partial<DataType>
}

export type RenameTypeAction = {
    type: "RENAME-TYPE"
    oldName: string
    newName: string
}

export type RemoveTypeAction = {
    type: "REMOVE-TYPE"
    data: string
}

export type AddRelationAction = {
    type: "ADD-RELATION"
    data: Relation
}

export type UpdateRelationAction = {
    type: "UPDATE-RELATION"
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
UpdateRelationAction | RemoveRelationAction

export const applyChange = (document: Model, action: DocumentAction): Model => {
    return document;
}