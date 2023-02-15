import { Link } from "react-router-dom"
import { classes } from "./utils"

export interface PanelItemProps extends React.HTMLProps<HTMLLIElement> {
    name: string
    disabled?: boolean
    caption: string

}

export const PanelItem = ({ 
    style, 
    className,
    caption, 
    title, 
    children,
    name,
    href='#',
    ...props
}: PanelItemProps) => {

    return (
        <li>
            <Link to={href} className="flex items-center p-2 text-base space-x-3 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span>{caption}</span>
            </Link>
        </li>
    )
}