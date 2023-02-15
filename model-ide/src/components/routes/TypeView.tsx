import { useParams } from "react-router-dom"

export const TypeView = () => {

    const { name } = useParams();

    return (
        <div>{name}</div>
    )
}