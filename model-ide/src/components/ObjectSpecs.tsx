
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPropertyAction, AnyType, Named, ObjectType, Property } from "../state/document";
import { AddNewProperty } from "./AddNewProperty";
import { Button } from "./controls/Button";
import { SectionBody } from "./controls/SectionBody";
import { SectionHeader } from "./controls/SectionHeader";
import { ObjectPropertySpecs } from "./ObjectPropertySpecs";

interface Props extends Named<ObjectType> {

}

export const ObjectSpecs = (props: Props) => {

    const dispatch = useDispatch();
    const [isAdding, setAdding] = useState<boolean>(false);

    const handleAddNewClicked = () => {
        setAdding(true);
    }

    const handleAdd = ({ name, ...data }: Named<Property<AnyType>>) => {
        dispatch(addPropertyAction(props.name, name, data));
        setAdding(false);
    }

    const handleCancelAdd = () => {
        setAdding(false);
    }

    return (
        <div className="w-full flex flex-col items-stretch px-4 py-2">

            <SectionHeader title="Properties">
                <Button onClick={handleAddNewClicked}>Add New Property</Button>
            </SectionHeader>
            <SectionBody>
                {
                    props.properties.keys
                        .map(k => props.properties.byKey[k])
                        .map(prop => <ObjectPropertySpecs key={prop.name} {...prop} />)
                }
                {
                    isAdding &&
                    <AddNewProperty onAdd={handleAdd} onCancel={handleCancelAdd} />
                }
            </SectionBody>

        </div>
    )
}