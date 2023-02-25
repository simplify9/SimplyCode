import { AnyType, humanFriendlyTypeName, Named, Property } from "../state/document";
import { Button } from "./controls/Button";

type Props = Named<Property<AnyType>> 

export const ObjectPropertySpecs = (props: Props) => {

    return (
        <div className="flex flex-row justify-between p-2">
            <div className="flex flex-col ">
                <div>{props.name}</div>
                <div className="text-sm text-gray-400">{humanFriendlyTypeName(props)}</div>
            </div>
            <Button>Delete</Button>
        </div>
        
    )
}