import React, { useState } from 'react';


export default function DropdownMenu(props) {
    const { onSubmit } = props;
    const [selectedYear, setSelectedYear] = useState("");

    // Generate an array of numbers from 1990 to 2023
    const yearOptions = Array.from({length: 34}, (_, i) => 1990 + i);

    const handleYearChange = (e) => {
        // Convert selected value to integer or set it to null if the default option is selected
        setSelectedYear(e.target.value === "" ? "" : parseInt(e.target.value));
        onSubmit(e.target.value === "" ? "" : parseInt(e.target.value));        
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

