import { AnyType, Relation } from "./types"

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