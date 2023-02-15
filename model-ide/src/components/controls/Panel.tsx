export interface PanelProps {
    caption: string
    children?: React.ReactNode
}

export const Panel = ({ children, caption }: PanelProps) => {

    return (
        <div className=" px-3 py-4 overflow-y-auto font-bold">
            <div className="text-lg text-white mb-2">{caption}</div>
            <ul className="space-y-2">
                {children}
            </ul>
        </div>
    )
}