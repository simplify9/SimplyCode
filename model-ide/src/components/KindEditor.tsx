import { useForm } from "react-hook-form";
import { AnyType, humanFriendlyTypeName } from "../state/document";
import { EditMode, ToggleEditor, ViewMode } from "./controls/ToggleEditor";
import { KindSelector } from "./KindSelector";


interface Props {
    kind: AnyType['kind']
    fromType?: string
    onChange: (value: { kind: string, fromType?: string }) => void
}

const toString = (kind: string, fromType?: string) => {
    if (kind === 'extender') {
        return `extender:${fromType}`;
    }
    else {
        return kind;
    }
}

const fromString = (kindString: string) => {
    return kindString.split(':');
}

export const KindEditor = ({ kind, fromType, onChange }: Props) => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            kindString: toString(kind, fromType)
        }
    });

    const handleUpdate = (data: any) => {
        const [newKind, newFromType] = fromString(data.kindString)
        onChange({
            kind: newKind,
            fromType: newFromType
        });
    }

    return (
        <ToggleEditor onSubmit={handleSubmit(handleUpdate)} propertyTitle='Kind'>

            <ViewMode>
                <div className="flex-grow">{humanFriendlyTypeName({ kind, fromType: fromType })}</div>
            </ViewMode>

            <EditMode>
                <KindSelector autoFocus {...register('kindString')} />
            </EditMode>

        </ToggleEditor>
    )
}