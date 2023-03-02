import { AnyType } from "../state/document"
import { ObjectSpecs } from "./ObjectSpecs"
import { TypeEditor } from "./utils"

export const AnyTypeSpecs = (props: TypeEditor<AnyType>) => {

    if (props.kind === 'object') {
        return (
            <ObjectSpecs {...props} />
        )
    }

    if (props.kind === 'text') {

    }

    return (
        <div>

        </div>
    )
}