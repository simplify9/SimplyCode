import { createContext, useCallback, useContext, useState } from "react"
import { Button } from "./Button"
import { Form } from "./Form"

import { icons } from "./icons"

type Context = {
    isEditing: boolean
    submit: () => void
    cancel: () => void
}

const noOp = () => { }

const context = createContext<Context>({ isEditing: false, submit: noOp, cancel: noOp })

interface WithChildren {
    children?: React.ReactNode
}

export const EditMode = ({ children }: WithChildren) => {
    const { isEditing, submit, cancel } = useContext(context);
    return isEditing
        ? <Form onSubmit={submit}>
            <div>
                {children}
                <div className="py-2 flex flex-row space-x-2">
                    <Button type="submit" colorHint="primary">Save</Button>
                    <Button onClick={cancel}>Cancel</Button>
                </div>
            </div>
        </Form>
        : null
}

export const ViewMode = ({ children }: WithChildren) => {
    const { isEditing } = useContext(context);
    return (
        <>
            {
                isEditing
                ? null
                : children
            }
        </>  
    ) 
}


interface Props {
    onSubmit: () => void 
    propertyTitle: string
    children?: React.ReactNode
}

export const ToggleEditor = ({ children, onSubmit, propertyTitle }: Props) => {

    const [isEditing, setEditing] = useState<boolean>(false);
    const handleUpdate = useCallback(() => {
        onSubmit();
        setEditing(false);
    }, [onSubmit])

    const handleEdit = () => {
        setEditing(true);
    }

    const handleCancel = () => {
        setEditing(false);
    }

    return (
        <div className="flex flex-row space-x-1">
            <button onClick={handleEdit} className="flex flex-col justify-between items-stretch">
                {icons.edit(isEditing ? 'w-8 h-8 fill-gray-300': 'w-8 h-8 fill-gray-500 hover:fill-gray-800')}
            </button>
            <div className="flex-grow flex flex-col space-y-1">
                <div className="text-xs tracking-wider text-gray-500">{propertyTitle}</div>
                <context.Provider value={{ isEditing, submit: handleUpdate, cancel: handleCancel }}>
                    {children}
                </context.Provider>
            </div>
        </div>
    )
}