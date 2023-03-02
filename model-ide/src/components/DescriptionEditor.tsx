import { useForm } from "react-hook-form";
import { TextArea } from "./controls/TextArea";
import { EditMode, ToggleEditor, ViewMode } from "./controls/ToggleEditor";


interface Props {
    value: string | null
    onChange: (value: string | null) => void
}

export const DescriptionEditor = ({ value, onChange }: Props) => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            description: value || ''
        }
    });

    const handleUpdate = (data: any) => {
        onChange(data.description === '' ? null : data.description);
    }

    return (
        <ToggleEditor onSubmit={handleSubmit(handleUpdate)} propertyTitle='Description'>

            <ViewMode>
                {!!value
                    ? <div key="value" className="flex-grow whitespace-pre-line">{value}</div>
                    : <div key="value" className="flex-grow font-light cursor-pointer text-gray-400">Fill out a description to document how the type relates to the domain</div>
                }
            </ViewMode>

            <EditMode>
                <TextArea autoFocus {...register('description')} />
            </EditMode>

        </ToggleEditor>
    )
}