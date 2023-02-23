export interface EntitySet<TEntity> {
    keys: string[]
    byKey: Record<string, TEntity>
}

export const entitySet = <T>(keys: string[], data: T[]): EntitySet<T> => ({
    keys,
    byKey: Object.fromEntries(
        keys.map((k, i) => [k, data[i]])
    )
})

export const applyAdd = <T>(state: EntitySet<T>, key: string, newEntity: T) => {

    return {
        keys: [...state.keys, key],
        byKey: {
            ...state.byKey,
            [key]: newEntity
        }
    }
}

export const applyUpdate = <T>(state: EntitySet<T>, key: string, updates: Partial<T>) => {

    return {
        ...state,
        byKey: {
            ...state.byKey,
            [key]: {
                ...state.byKey[key],
                ...updates
            }
        }
    }
}

export const applyRemove = <T>(state: EntitySet<T>, key: string) => {

    const { [key]: _, ...byKey } = state.byKey;
    return {
        keys: state.keys.filter(k => k !== key),
        byKey
    }
}
