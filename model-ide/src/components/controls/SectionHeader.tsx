interface Props {
    title: string
    subTitle?: string
    children?: React.ReactNode
}

export const SectionHeader = ({ title, subTitle, children }: Props) => {

    return (
        <div className="flex flex-row justify-between items-center border-b-2 py-2">
            <div className="flex flex-col space-y-1">
                <div className='text-md font-bold'>{title}</div>
                {!!subTitle && 
                    <div className="text-sm text-gray-500">{subTitle}</div>
                }
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}