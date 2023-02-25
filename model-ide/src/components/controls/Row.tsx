import { classes } from "./utils"

interface Props {
    className?: string
    children?: React.ReactNode
}

export const Row = ({ children, className }: Props) => {

    return (
        <div className={classes("flex flex-row w-full py-2 px-4 items-end", className)}>
            {children}
        </div>
    )
}