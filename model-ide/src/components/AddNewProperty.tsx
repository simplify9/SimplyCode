import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { AnyType, createTypeWithDefaults, Named, Property } from "../state/document";
import { Button } from "./controls/Button";
import { Form } from "./controls/Form";
import { FormField } from "./controls/FormField";
import { Row } from "./controls/Row";
import { TextBox } from "./controls/TextBox";
import { KindSelector } from "./KindSelector";
import { Switch } from "./controls/Switch";
import { TextArea } from "./controls/TextArea";

const createProperty = (kindString: string, description: string | null): AnyType => {
    const [kind, fromType] = kindString.split(':')
    return {
        ...createTypeWithDefaults(kind, fromType),
        description
    };
}

interface Props {

    onAdd: (props: Named<Property<AnyType>>) => void
    onCancel: () => void
}

const schema = yup.object({
    name: yup.string().required('you must provide a name'),
    kind: yup.string().required('you must choose data type'),
    description: yup.string()
}).required();

export const AddNewProperty = ({ onAdd, onCancel }: Props) => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        onAdd({ name: data.name, ...data, ...createProperty(data.kind, data.description ?? null) });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="space-x-4">
                <FormField caption="Name" key="name" className="w-1/2">
                    <TextBox autoComplete="off" autoFocus type="text" {...register('name')} placeholder='Enter a title-case property name' />
                </FormField>
                <FormField caption="Kind" key="kind" className="w-2/4">
                    <KindSelector {...register('kind')} />
                </FormField>
                <FormField caption="Multiple Values" key="is_list" className='w-1/4'>
                    <Switch {...register('isList')} />
                </FormField>
                <FormField caption="Mandatory" key="is_man" className='w-1/4'>
                    <Switch {...register('isRequired')} />
                </FormField>
            </Row>
            <Row>
                <FormField caption="Description" key="description" className="w-full">
                    <TextArea {...register('description')} />
                </FormField>
            </Row>
            <Row>
                <Button type="submit" colorHint="primary">Add</Button>
                <Button type="reset" onClick={onCancel}>Cancel</Button>
            </Row>
        </Form>
    )
}