interface Props {
    children?: React.ReactNode
}

export const SectionBody = ({ children }: Props) => {

    return (
        <div className="flex flex-col items-stretch">
            {children}
        </div>
    )
}