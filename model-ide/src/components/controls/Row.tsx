
interface Props {
    children?: React.ReactNode
}

export const Row = ({ children }: Props) => {

    return (
        <div className="flex flex-row w-full p-2">
            {children}
        </div>
    )
}