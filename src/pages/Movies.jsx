import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'


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
      <h1>Choose Your Movie</h1>
      < SearchBar onSubmit={setSearch} />
      <Row className='selectDropDownRow'>
        <Col lg={6} md={6} sm={12} xs={12} >
          < DropDownMenuYear {...dropDownYear} />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          < DropDownMenuPage {...dropDownPage} />
        </Col>
      </Row>
      <div 
        className="ag-theme-balham-dark"
        style={{ height: "650px", width: "auto" }} 
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