import { useSelector } from "react-redux"

export const createStateHook = <TState, TOut>(selector: (state: TState) => TOut) => {

    return () => useSelector(selector);

}