import { useState } from "react"
import { AnyType, Named, ObjectType, Property } from "../state/document"
import { applyAdd, applyRemove } from "../state/entitySet"
import { AddNewProperty } from "./AddNewProperty"
import { ListEditor } from "./controls/ListEditor"
import { ObjectPropertySpecs } from "./ObjectPropertySpecs"

interface Props {
    value: ObjectType['properties']
    onChange: (value: ObjectType['properties']) => void
}

export const ObjectProperties = ({ value, onChange }: Props) => {

    const [isAdding, setAdding] = useState<boolean>(false);

    const handleAddNewClicked = () => {
        setAdding(true);
    }

    const handleAdd = ({ name, ...data }: Named<Property<AnyType>>) => {
        const newProps = applyAdd(value, name, { name, ...data });
        onChange(newProps);
        setAdding(false);
    }

    const handleCancelAdd = () => {
        setAdding(false);
    }

    const handleDelete = (name: string) => {
        const newProps = applyRemove(value, name);
        onChange(newProps);
    }

    return (
        

        <ListEditor propertyTitle="Properties" onAdd={handleAddNewClicked} isAdding={isAdding}>

            {
                value.keys
                    .map(k => value.byKey[k])
                    .map(prop => (
                        <ObjectPropertySpecs 
                            allowEdit 
                            allowDelete 
                            key={prop.name} 
                            onDelete={handleDelete}
                            {...prop} />
                    ))
            }
            {
                isAdding &&
                <AddNewProperty onAdd={handleAdd} onCancel={handleCancelAdd} />
            }

        </ListEditor>

    )
}