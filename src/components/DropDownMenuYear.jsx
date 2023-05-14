import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

// jsx component for the year selection dropdown
export default function DropDownMenuYear(props) {
    const { yearOptions, setYear } = props;
    const [selectedYear, setSelectedYear] = useState("");

    const handleYearChange = (e) => {
        // Convert selected value to integer or set it to null if the default option is selected
        setSelectedYear(e.target.value === "" ? "" : parseInt(e.target.value));
        setYear(e.target.value === "" ? "" : parseInt(e.target.value));        
    }

    return (
        <Form.Select className='selectDropDown' value={selectedYear ? selectedYear : ""} onChange={handleYearChange}>
            <option value="">Year</option>
            {yearOptions.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </Form.Select>
    );
}

