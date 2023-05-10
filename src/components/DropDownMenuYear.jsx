import React, { useState } from 'react';


export default function DropDownMenuYear(props) {
    const { yearOptions, setYear } = props;
    const [selectedYear, setSelectedYear] = useState("");

    const handleYearChange = (e) => {
        // Convert selected value to integer or set it to null if the default option is selected
        setSelectedYear(e.target.value === "" ? "" : parseInt(e.target.value));
        setYear(e.target.value === "" ? "" : parseInt(e.target.value));        
    }

    return (
        <select value={selectedYear ? selectedYear : ""} onChange={handleYearChange}>
            <option value="">None</option>
            {yearOptions.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
}

