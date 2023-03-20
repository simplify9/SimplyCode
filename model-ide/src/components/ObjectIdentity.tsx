import { useForm } from "react-hook-form";
import { ObjectType } from "../state/document"
import { FormField } from "./controls/FormField";
import { MultiValueTextBox } from "./controls/MultiValueTextBox";
import { Switch } from "./controls/Switch";
import { TextBox } from "./controls/TextBox";
import { EditMode, ToggleEditor, ViewMode } from "./controls/ToggleEditor"

interface Value extends Pick<ObjectType, 'isEntity' | 'keyProperties'> {

}

interface Props extends Value {
    onChange: (value: Value) => void
}

export const ObjectIdentity = ({ onChange, isEntity, keyProperties }: Props) => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        
    });

    const onSubmit = (data: any) => {

        
    }

    return (
        <ToggleEditor onSubmit={handleSubmit(onSubmit)} propertyTitle='Identity'>
            <ViewMode>
                <div>No identity</div>
            </ViewMode>
            <EditMode>
                <FormField caption="Has Identity">
                    <Switch {...register('isEntity')} />
                </FormField>
                <FormField caption="Identifiable By">
                    <MultiValueTextBox />
                </FormField>
            </EditMode>
        </ToggleEditor>
    )
}