import { Link } from "react-router-dom"
import { Button } from "./controls/Button"



export const ModelPanel = () => {



    return (
        <div className='flex flex-col justify-between items-stretch w-full bg-blue-900'>
            <div className='px-4 text-white py-2 text-lg font-bold border-b border-blue-700'>App Data Model</div>
            <div className="p-2 flex flex-row space-x-2 border-b border-black">
                <button className="text-xs text-white p-1 rounded border bg-blue-800 border-blue-600">Export</button>
                <button className="text-xs text-white p-1 rounded border bg-blue-800 border-blue-600">Undo</button>
                <button className="text-xs text-white p-1 rounded border bg-blue-800 border-blue-600">Redo</button>
            </div>
        </div>
    )
}