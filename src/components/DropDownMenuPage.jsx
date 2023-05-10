import React, { useState } from 'react';


export default function DropDownMenuPage(props) {
    const { pageOptions, setPageNum } = props;
    const [selectedPage, setSelectedPage] = useState("");

    const handlePageChange = (e) => {
        // Convert selected value to integer or set it to null if the default option is selected
        setSelectedPage(e.target.value === "" ? "" : parseInt(e.target.value));
        setPageNum(e.target.value === "" ? "" : parseInt(e.target.value));        
    }

    return (
        <select value={selectedPage ? selectedPage : ""} onChange={handlePageChange}>
            <option value="">None</option>
            {pageOptions.map((page) => (
                <option key={page} value={page}>
                    {page}
                </option>
            ))}
        </select>
    );
}

