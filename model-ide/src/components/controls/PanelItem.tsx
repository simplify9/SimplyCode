import { Link, NavLink } from "react-router-dom"
import { classes } from "./utils"

export interface PanelItemProps extends React.HTMLProps<HTMLLIElement> {
    name: string
    disabled?: boolean
    caption: string

}

const classFn = ({ isActive }: { isActive: boolean }) => isActive
        ? "flex items-center p-2 text-base space-x-3 font-bold text-gray-900 rounded-lg dark:text-white"
        : "flex items-center p-2 text-base space-x-3 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";

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
            <NavLink to={href} className={classFn}>
                <span>{caption}</span>
            </NavLink>
        </li>
    )
}