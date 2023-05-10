import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


import SearchBar from "../components/SearchBar";
import DropDownMenuPage from '../components/DropDownMenuPage';
import DropDownMenuYear from '../components/DropDownMenuYear';

import { MoviesSearch } from "../api";

export default function Movies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const {rowData, paginationData} = MoviesSearch(pageNum, search, year);

  const columns = [
    {headerName:"IMDB ID",field:"imdbID", hide:true},
    {headerName:"Title",field:"title"},
    {headerName:"Year",field:"year"},
    {headerName:"IMBD Rating",field:"imbdRating"},
    {headerName:"Rotten Tomates Rating",field:"rtRating"},
    {headerName:"Metacritic Rating",field:"mcRating"},
    {headerName:"Classification",field:"classification"},
  ];

  // Generate an array of numbers from 1990 to 2023
  const yearOptions = Array.from({length: 34}, (_, i) => 1990 + i);
  const dropDownYear = {yearOptions, setYear}

  const pageOptions = Array.from({length: paginationData.lastPage}, (_, i) => 1 + i);
  const dropDownPage = {pageOptions, setPageNum}

  return (
    <div className='movieContainer'>
      <h1>Book Container</h1>
      <p> Books published in 2000 in the Drama category</p>
      < SearchBar onSubmit={setSearch} />
      < DropDownMenuYear {...dropDownYear} />
      < DropDownMenuPage {...dropDownPage} />
      <div 
        className="ag-theme-balham"
        style={{ height: "650px", width: "1200px" }} 
      >
        <AgGridReact 
          columnDefs={columns} 
          rowData={rowData} 
          pagination={true} 
          paginationPageSize={100}
          onRowClicked={(row) => navigate(`/movieData?id=${row.data.imdbID}`)}
        />
      </div>
    </div>
  );
}