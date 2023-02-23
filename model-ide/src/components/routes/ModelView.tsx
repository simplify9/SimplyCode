import { PageBody } from "../controls/PageBody"
import { PageHeader } from "../controls/PageHeader"

export const ModelView = (props: {}) => {

    return (
        <>
            <PageHeader title='App Data Model' />
            <PageBody>
                <p>This utility allows you to define and manage your app data structures on a high-level and it will help you generate code sections for different elements in your application</p>
            </PageBody>
        </>
    )
}