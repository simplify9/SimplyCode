import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Form } from "../controls/Form"
import { FormField } from "../controls/FormField"
import { PageBody } from "../controls/PageBody"
import { PageHeader } from "../controls/PageHeader"
import { Row } from "../controls/Row"
import { useDispatch } from "react-redux";
import { addTypeAction, AnyType } from "../../state/document";
import { entitySet } from "../../state/entitySet";
import { useNavigate } from "react-router-dom";
import { Button } from "../controls/Button";
import { KindSelector } from "../KindSelector";
import { TextBox } from "../controls/TextBox";

const schema = yup.object({
    name: yup.string().required('you must provide a name'),
    kind: yup.string().required('you must choose data type'),
}).required();

const createType = (kind: string): AnyType => {
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

export const AddType = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        dispatch(addTypeAction(data.name, createType(data.kind)));
        navigate(`/types/${data.name}`);
    }

    return (
        <>
            <PageHeader title='Add New Type' />
            <PageBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row key='name'>
                        <FormField caption="Name" className="w-full">
                            <TextBox autoComplete="off" autoFocus type="text" {...register('name')} placeholder='Enter a title Case unique name' />
                        </FormField>
                    </Row>
                    <Row key='kind'>
                        <FormField caption="Kind" className="w-full">
                            <KindSelector {...register('kind')} />
                        </FormField>
                    </Row>
                    <Row>
                        <Button type="submit" colorHint="primary">Add</Button>
                    </Row>
                </Form>
            </PageBody>
        </>
    )
}