import { ObjectType } from "../state/document";
import { ObjectIdentity } from "./ObjectIdentity";
import { ObjectProperties } from "./ObjectProperties";
import { TypeEditor } from "./utils";

const noOp = () => { }

interface Props extends TypeEditor<ObjectType> {

}

export const ObjectSpecs = ({ onChange = noOp, properties, isEntity, keyProperties }: Props) => {

    const handlePropertiesChange = (properties: ObjectType['properties']) => {
        onChange({ properties });
    }

    const handleIdentityChange = ({ isEntity, keyProperties }: Pick<ObjectType, 'isEntity' | 'keyProperties'>) => {
        onChange({ isEntity, keyProperties });
    }

    return (
        <>
            <ObjectProperties value={properties} onChange={handlePropertiesChange} />
            <ObjectIdentity isEntity={isEntity} keyProperties={keyProperties} onChange={handleIdentityChange} />
        </>
    )
}