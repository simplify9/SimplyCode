interface Props {
    children?: React.ReactNode
}

export const SideArea = ({ children }: Props) => {

    return (
        <aside id="default-sidebar" className="fixed top-16 bottom-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0 bg-gray-50 dark:bg-gray-800" aria-label="Sidebar">
            {children}
        </aside>
    )
}