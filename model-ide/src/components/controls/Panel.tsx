export interface PanelProps {
    children?: React.ReactNode
}

export const Panel = ({ children }: PanelProps) => {

    return (
        <div className=" px-3 py-4 overflow-y-auto font-bold">
            <ul className="space-y-2">
                {children}
            </ul>
        </div>
    )
}