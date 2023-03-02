import { useState } from "react";
import { AnyType, humanFriendlyTypeName, Named, ObjectType, Property } from "../state/document";
import { useModelTypeByName } from "../state/ide";
import { Button } from "./controls/Button";
import { icons } from "./controls/icons";
import { Modal, ModalButton } from "./controls/Modal";


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
    onUpdate?: (name: string, data: Property<AnyType>) => void
    onDelete?: (name: string) => void
}

export const ObjectPropertySpecs = (props: Props) => {

    const [isUpdating, setUpdating] = useState<boolean>(false);

    const typeName = props.kind === 'extender' ? props.fromType : undefined; 

    const handleEdit = () => {
        setUpdating(true);
    }

    const handleModalExit = (button: ModalButton) => {
        setUpdating(false);
    }

    const handleDelete = () => {
        if (props.onDelete) props.onDelete(props.name);
    }

    return (
        <>
            <div className="flex flex-row items-start space-x-2">
                
                <div className="flex flex-col space-y-1">
                    <div className={props.leaf ? "": "font-bold"}>{props.name}</div>
                    <span className="bg-gray-100 text-gray-800 text-sm font-light mr-2 px-2.5 py-0.5 rounded ">
                        {`${props.isList ? 'List of ': ''}${humanFriendlyTypeName(props)}`}
                    </span>
                </div>
                <div className="flex-grow ">{props.description}</div>
                <div className="flex flex-row space-x-2">

                    {props.allowEdit && 
                        <button onClick={handleEdit} className="flex flex-col justify-between items-stretch">
                            {icons.edit('w-8 h-8 fill-gray-500 hover:fill-gray-800')}
                        </button>
                    }

                    {props.allowDelete && 
                        <button onClick={handleDelete} className="flex flex-col justify-between items-stretch">
                            {icons.delete('w-8 h-8 fill-gray-500 hover:fill-gray-800')}
                        </button>
                    }
                </div>
            </div>
            {typeName && !props.leaf && <ReferencedType typeName={typeName} />}
            {isUpdating && (
                <Modal title={`Property: ${props.name}`} onExit={handleModalExit}>
                    TBI
                </Modal>
            )}
        </>
    )
}