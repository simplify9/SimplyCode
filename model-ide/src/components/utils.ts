import { AnyType, Named } from "../state/document";

export type TypeEditor<T> = T & {
    onChange?: (value: Partial<T>) => void
}