import { classes } from "./utils"

interface Props {
    className?: string
    caption: string
    children?: React.ReactNode
}

export const FormField = ({ caption, children, className }: Props) => {

    return (
        <label className={classes("flex flex-col space-y-1 items-stretch", className)}>
            <div>{caption}</div>
            {children}
        </label>
    )
}