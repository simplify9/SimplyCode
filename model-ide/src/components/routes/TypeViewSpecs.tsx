import { useParams } from "react-router-dom";
import { useModelTypeByName } from "../../state/ide";
import { ObjectSpecs } from "../ObjectSpecs"


export const TypeViewSpecs = () => {

    const { name } = useParams();
    const type = useModelTypeByName(name!);

    if (type.kind === 'object') {
        return (
            <ObjectSpecs name={name!} {...type} />
        )
    }

    return (
        <div>

        </div>
    )
}