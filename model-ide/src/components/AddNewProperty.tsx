import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { AnyType, Named, Property } from "../state/document";
import { Button } from "./controls/Button";
import { Form } from "./controls/Form";
import { FormField } from "./controls/FormField";
import { Row } from "./controls/Row";
import { TextBox } from "./controls/TextBox";
import { KindSelector } from "./KindSelector";
import { Switch } from "./controls/Switch";
import { entitySet } from "../state/entitySet";

const createProperty = (kind: string): AnyType => {
    if (kind === 'object') {
        return {
            kind: 'object',
            isEntity: false,
            properties: entitySet([], []),
            includes: []
        }
    }
    else if (kind.indexOf(':') !== -1) {
        const [_, fromType] = kind.split(':');
        return {
            kind: 'extender',
            fromType
        }
    }
    else {
        return {
            kind: kind as any,
        }
    }
}

interface Props {

    onAdd: (props: Named<Property<AnyType>>) => void
    onCancel: () => void
}

const schema = yup.object({
    name: yup.string().required('you must provide a name'),
    kind: yup.string().required('you must choose data type'),
}).required();

export const AddNewProperty = ({ onAdd, onCancel }: Props) => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        onAdd({ name: data.name, ...data, ...createProperty(data.kind) });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="space-x-4">
                <FormField caption="Name" key="name" className="w-1/3">
                    <TextBox autoComplete="off" autoFocus type="text" {...register('name')} placeholder='Enter a title-case property name' />
                </FormField>
                <FormField caption="Kind" key="kind">
                    <KindSelector {...register('kind')} />
                </FormField>
                <FormField caption="Multiple Values" key="is_list">
                    <Switch {...register('isList')} />
                </FormField>
                <FormField caption="Mandatory" key="is_man">
                    <Switch {...register('isRequired')} />
                </FormField>
                <Button type="submit" colorHint="primary">Add</Button>
                <Button type="reset" onClick={onCancel}>Cancel</Button>
            </Row>
        </Form>
    )
}