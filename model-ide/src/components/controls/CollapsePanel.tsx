
interface Props {
    children: React.ReactNode
}


export const CollapsePanel = ({ children }: Props) => {

    return (
        <div className="flex flex-col h-full">
            {children}
        </div>
    )
}