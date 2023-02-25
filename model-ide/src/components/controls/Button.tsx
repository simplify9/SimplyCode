import { classes } from "./utils"

type ColorHint = "danger" | "normal" | "primary"

interface Props extends React.DetailedHTMLProps<React.HTMLProps<HTMLButtonElement>, HTMLButtonElement> { 
    type?: "button" | "submit" | "reset"
    colorHint?: ColorHint
}

const classesPerHint = {
    primary: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    normal: 'text-gray-900 bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-200 dark:hover:bg-gray-300 dark:focus:ring-gray-500',
    danger: 'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
}

export const Button = ({ colorHint = "normal", ...props }: Props) => {

    return (
        <button
            type='button'
            className={classes("focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none", classesPerHint[colorHint])}
            {...props} />
    )
}