interface Props {
    caption: string
    children?: React.ReactNode
}

export const FormField = ({ caption, children }: Props) => {

    return (
        <label className="w-full flex flex-col space-y-1">
            <div>{caption}</div>
            {children}
        </label>
    )
}