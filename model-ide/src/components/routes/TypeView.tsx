import { NavLink, Outlet, useParams } from "react-router-dom"
import { humanFriendlyTypeName } from "../../state/document";
import { useModelTypeByName } from "../../state/ide";
import { Button } from "../controls/Button";
import { PageBody } from "../controls/PageBody";
import { PageHeader } from "../controls/PageHeader";


export const TypeView = () => {

    const { name } = useParams();
    const type = useModelTypeByName(name!);

    return (
        <>
            <PageHeader title={name!} subTitle={humanFriendlyTypeName(type)}>
                <Button colorHint="danger">Delete</Button>
            </PageHeader>
            <PageBody>
                <nav className="flex flex-row space-x-4 border-b-2 mb-4">
                    <NavLink to={``} className={s => s.isActive ? "font-bold text-sm tracking-wide" : "text-sm tracking-wide"} >Specifications</NavLink>
                    
                </nav>
                <Outlet />
            </PageBody>
        </>
    )
}