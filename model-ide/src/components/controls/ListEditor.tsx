import { createContext, useCallback, useContext, useState } from "react"
import { Button } from "./Button"
import { Form } from "./Form"
import { icons } from "./icons"

type Context = {
    isAdding: boolean
    submit: () => void
    cancel: () => void
}

const noOp = () => { }

const context = createContext<Context>({ isAdding: false, submit: noOp, cancel: noOp })

interface WithChildren {
    children?: React.ReactNode
}

export const ListAdd = ({ children }: WithChildren) => {

    const { isAdding, submit, cancel } = useContext(context);

    return (
        <>
            {
                isAdding
                ? <Form onSubmit={submit}>
                    {children}
                    <div className="py-2 flex flex-row space-x-2">
                        <Button type="submit" colorHint="primary">Save</Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </div>
                </Form>
                : null
            }
        </>
    )
}


interface Props {
    children?: React.ReactNode
    propertyTitle: string
    onAdd: () => void
    isAdding: boolean
}

export const ListEditor = ({ propertyTitle, children, onAdd, isAdding }: Props) => {

    return (
        <div className="flex flex-row space-x-1">
            <button className="flex flex-col justify-between items-stretch" onClick={onAdd}>
                {icons.add(isAdding ? 'w-8 h-8 fill-gray-300': 'w-8 h-8 fill-gray-500 hover:fill-gray-800')}
            </button>
            <div className="flex-grow flex flex-col space-y-1">
                <div className="text-xs tracking-wider text-gray-500">{propertyTitle}</div>
                <div className="space-y-4 flex flex-col p-4 border rounded">
                    
                    {children}
                    
                </div>
            </div>
        </div>
    )
}