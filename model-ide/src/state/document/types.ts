import { EntitySet } from "../entitySet"

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
    keyProperties: string[]
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