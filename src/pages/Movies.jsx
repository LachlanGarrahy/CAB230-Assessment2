import React, {useState, useEffect} from"react";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

import { useNavigate } from 'react-router-dom';

export default function Movies() {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {headerName:"Title",field:"title"},
    {headerName:"Year",field:"year"},
    {headerName:"ImbdID",field:"imbdID"},
    {headerName:"Imbd Rating",field:"imbdRating"},
    {headerName:"Rotten Tomates Rating",field:"rtRating"},
    {headerName:"Metacritic Rating",field:"mcRating"},
    {headerName:"Classification",field:"classification"},
  ];

  useEffect(() => {
    fetch("http://sefdb02.qut.edu.au:3000/movies/search")
    .then(res => res.json())
    .then(data => data.works)
    .then(works =>
      works.map(movie => ({
        title: movie.title,
        year: movie.year,
        imbdID: movie.imbdID,
        imbdRating: movie.imbdRating,
        rtRating: movie.rottenTomatoesRating,
        mcRating: movie.metacriticRating,
        classification: movie.classification
      }))
    )
    .then(movies => setRowData(movies));
  }, []); 

  return (
    <div className='container'>
      <h1>Book Container</h1>
      <p> Books published in 2000 in the Drama category</p>
      <div 
        className="ag-theme-balham"
        style={{ height: "300px", width: "800px" }} 
      >
        <AgGridReact 
          columnDefs={columns} 
          rowData={rowData} 
          pagination={true} 
          paginationPageSize={7}
          onRowClicked={(row) => navigate(`/book?title=${row.data.title}`)}
        />
      </div>
    </div>
  );
}