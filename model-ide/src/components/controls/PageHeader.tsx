interface Props {
    title: string
    children?: React.ReactNode
}

export const PageHeader = ({ title, children }: Props) => {

    return (
        <div className="flex flex-row justify-between items-center p-4">
            <div className='text-xl font-bold'>{title}</div>
            <div>
                {children}
            </div>
        </div>
    )
}