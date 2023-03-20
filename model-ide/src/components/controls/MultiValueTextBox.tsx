import React from "react";

interface Props extends React.DetailedHTMLProps<React.HTMLProps<HTMLInputElement>, HTMLInputElement> {

}

export const MultiValueTextBox = React.forwardRef<HTMLInputElement, Props>((props, ref) => {

    return (
        <div className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" {...props}>
            Hello
        </div>
    )
})