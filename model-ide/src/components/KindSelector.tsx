import React from "react";
import { useModelTypes } from "../state/ide";
import { SelectBox } from "./controls/SelectBox";

interface Props extends React.DetailedHTMLProps<React.HTMLProps<HTMLSelectElement>, HTMLSelectElement> {

}

export const KindSelector = React.forwardRef<HTMLSelectElement, Props>((props, ref) => {

    const userTypes = useModelTypes();

    return (
        <SelectBox ref={ref as any} {...props}>
            <option value=''>-- Select Type --</option>
            <optgroup label="Basic">
                <option value='number'>Number</option>
                <option value='text'>Text</option>
                <option value='boolean'>Boolean</option>
                <option value='date'>Date</option>
                <option value='datetime'>Date with Time</option>
                <option value='time'>Time</option>
                <option value='timespan'>Time Interval</option>
                <option value='geopoint'>Geo-Location</option>
                <option value='object'>Object</option>
            </optgroup>
            {
                (userTypes.length > 0) &&
                <optgroup label="From Model">
                    {
                        userTypes.map(t => (
                            <option key={t.name} value={`ext:${t.name}`}>{t.name}</option>
                        ))
                    }
                </optgroup>
            }
        </SelectBox>
    )
})