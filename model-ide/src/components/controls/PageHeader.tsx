interface Props {
    title: string
    subTitle?: string
    children?: React.ReactNode
}

export const PageHeader = ({ title, children, subTitle }: Props) => {

    return (
        <div className="flex flex-row justify-between items-center p-4">
            <div className="flex flex-col space-y-1">
                <div className='text-xl font-bold'>{title}</div>
                {!!subTitle && 
                    <div className="text-xs text-gray-500">{subTitle}</div>
                }
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}