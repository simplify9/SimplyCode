interface Props {
    children?: React.ReactNode
}

export const ContentArea = ({ children }: Props) => {

    return (
        <div className="pl-64 pt-16">
            {children}
        </div>
    )
}