interface Props {
    children?: React.ReactNode
}

export const PageBody = ({ children }: Props) => {

    return (
        <div className="px-4 flex flex-col">
            {children}
        </div>
    )
}