import { classes } from "./utils"

export interface PanelFolderProps extends React.HTMLProps<HTMLLIElement> {
    name: string
    disabled?: boolean
    caption: string
    toggled?: boolean
    onToggle?: (value: boolean, name: string) => void
}

export const PanelFolder = ({ 
    style, 
    className,
    caption, 
    children,
    toggled,
    name,
    onToggle,
    ...props
}: PanelFolderProps) => {

    const allClasses = classes(className, 'flex flex-col align-stretch relative');

    const handleClick = () => {
        if (onToggle) onToggle(!toggled, name);
    }

    return (
        <li {...props} className={allClasses} style={style}>
            <a key='header' 
                href='#' 
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                {caption}
            </a>
            {
                toggled && 
                <ul className="space-y-2 pl-8" key='body'>
                    {children}
                </ul>
            }
        </li>
    )
}