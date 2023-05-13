import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import React, { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'


import SearchBar from "../components/SearchBar";
import DropDownMenuYear from '../components/DropDownMenuYear';

import { MoviesSearchInfin } from '../api';

export default function Movies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");

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

  const getDataSource = () => {
    const dataSource = {
      getRows: async (params) => {
        const pageNumber = params.endRow / 100;
        const movieData = await MoviesSearchInfin(pageNumber, search, year);
        params.successCallback(movieData.data, movieData.total);
      },
    };
    return dataSource;
  };

  const dataSource = useMemo(() => {
    return getDataSource();
  }, [search, year]);

  const onRowClicked= (row) => navigate(`/movieData?id=${row.data.imdbID}`)

  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      enableRowGroup: false,
      enablePivot: false,
      enableValue: true,
      sortable: false,
      resizable: true,
      filter: false,
      flex: 1,
      minWidth: 100
    };
  }, []);

  return (
    <div className='movieContainer'>
      <h1>Choose Your Movie</h1>
      <Row className='selectDropDownRow'>
        <Col lg={9} md={9} sm={12} xs={12} >
          < SearchBar onSubmit={setSearch} />
        </Col>
        <Col lg={3} md={3} sm={12} xs={12} >
          < DropDownMenuYear {...dropDownYear} />
        </Col>
      </Row>
      <div 
        className="ag-theme-balham-dark"
        style={{ height: "650px", width: "auto" }} 
      >
        <AgGridReact
          pagination={false}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          rowModelType={"infinite"}
          cacheOverflowSize={2}
          cacheBlockSize={100}
          maxConcurrentDatasourceRequests={1}
          maxBlocksInCache={50}
          infiniteInitialRowCount={1000}
          datasource={dataSource}
          onRowClicked={onRowClicked}
        />
      </div>
    </div>
  );
}