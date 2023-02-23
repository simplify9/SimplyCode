interface Props {
    onSubmit?: () => void
    children?: React.ReactNode
}

export const Form = ({ children, onSubmit }: Props) => {

    return (
        <form noValidate onSubmit={onSubmit}>
            {children}
        </form>
    )
}