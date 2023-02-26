import { AnyType, humanFriendlyTypeName, Named, ObjectType, Property } from "../state/document";
import { useModelTypeByName } from "../state/ide";
import { Button } from "./controls/Button";


const ReferencedObject = (props: Named<ObjectType>) => {

    return (
        <div className="pl-8">
            {
                props.properties.keys
                    .map(k => props.properties.byKey[k])
                    .map(prop => <ObjectPropertySpecs leaf key={prop.name} {...prop} />)
            }
        </div>
    )
}

interface ReferencedTypeProps {
    typeName: string
}

const ReferencedType = ({ typeName }: ReferencedTypeProps) => {
    const type = useModelTypeByName(typeName);
    return (
        type.kind === 'object'
            ? <ReferencedObject name={typeName} {...type} />
            : null
    )
}

type Props = Named<Property<AnyType>> & {
    leaf?: boolean
    allowDelete?: boolean
    allowEdit?: boolean
}

export const ObjectPropertySpecs = (props: Props) => {
    const typeName = props.kind === 'extender' ? props.fromType : undefined; 
    return (
        <>
            <div className="flex flex-row justify-between p-2">
                <div className="flex flex-col ">
                    <div>{props.name}</div>
                    <div className="text-sm text-gray-400">{humanFriendlyTypeName(props)}</div>
                </div>
                <div className="flex flex-row space-x-2">
                    {props.allowEdit && <Button>Edit</Button>}
                    {props.allowDelete && <Button>Delete</Button>}
                </div>
            </div>
            {typeName && !props.leaf && <ReferencedType typeName={typeName} />}
        </>
    )
}