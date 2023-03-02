import { classes } from "./utils"

interface Props {
    className?: string
    caption: string
    children?: React.ReactNode
}

export const FormField = ({ caption, children, className }: Props) => {

    return (
        <div className={classes("flex flex-col space-y-1 items-stretch", className)}>
            <div className="text-sm tracking-wide text-gray-800">{caption}</div>
            {children}
        </div>
    )
}