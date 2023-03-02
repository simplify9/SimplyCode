import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AnyType, updateTypeAction } from "../../state/document";
import { useModelTypeByName } from "../../state/ide";
import { AnyTypeSpecs } from "../AnyTypeSpecs";
import { DescriptionEditor } from "../DescriptionEditor";
import { KindEditor } from "../KindEditor";

export const TypeViewSpecs = () => {

    const { name } = useParams();
    const dispatch = useDispatch();
    const type = useModelTypeByName(name!);

    const handleDescriptionChange = (description: string | null) => {
        dispatch(updateTypeAction(name!, { description }));
    }

    const handleTypeChange = (data: Partial<AnyType>) => {
        dispatch(updateTypeAction(name!, data));
    }

    const handleKindChange = () => {

    }

    return (
        <div className="flex flex-col items-stretch space-y-4">
            <DescriptionEditor value={type.description} onChange={handleDescriptionChange} />
            <KindEditor kind={type.kind} fromType={('fromType' in type) ? type.fromType : undefined} onChange={handleKindChange} />
            <AnyTypeSpecs {...type} onChange={handleTypeChange} />
        </div>
    )
}