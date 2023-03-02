
import { useState } from "react";
import { AnyType, Named, ObjectType, Property } from "../state/document";
import { applyAdd, applyRemove } from "../state/entitySet";
import { AddNewProperty } from "./AddNewProperty";
import { Button } from "./controls/Button";
import { ListEditor } from "./controls/ListEditor";
import { SectionBody } from "./controls/SectionBody";
import { SectionHeader } from "./controls/SectionHeader";
import { ObjectPropertySpecs } from "./ObjectPropertySpecs";
import { TypeEditor } from "./utils";

const noOp = () => { }

interface Props extends TypeEditor<ObjectType> {

}

export const ObjectSpecs = ({ onChange = noOp, properties }: Props) => {

    const [isAdding, setAdding] = useState<boolean>(false);

    const handleAddNewClicked = () => {
        setAdding(true);
    }

    const handleAdd = ({ name, ...data }: Named<Property<AnyType>>) => {
        const newProps = applyAdd(properties, name, { name, ...data });
        onChange({ properties: newProps });
        setAdding(false);
    }

    const handleCancelAdd = () => {
        setAdding(false);
    }

    const handleDelete = (name: string) => {
        const newProps = applyRemove(properties, name);
        onChange({ properties: newProps });
    }

    return (
        

        <ListEditor propertyTitle="Properties" onAdd={handleAddNewClicked} isAdding={isAdding}>

                {
                    properties.keys
                        .map(k => properties.byKey[k])
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