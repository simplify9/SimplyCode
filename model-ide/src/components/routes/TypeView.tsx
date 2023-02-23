import { useParams } from "react-router-dom"
import { PageBody } from "../controls/PageBody";
import { PageHeader } from "../controls/PageHeader";
import { Row } from "../controls/Row";

export const TypeView = () => {

    const { name } = useParams();
    

    return (
        <>
            <PageHeader title={name!} />
            <PageBody>
                <Row>

                </Row>
            </PageBody>
        </>
    )
}