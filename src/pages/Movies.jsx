import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

import { useNavigate } from 'react-router-dom';

import { MoviesSearch } from "../api";

export default function Movies() {
  const navigate = useNavigate();
  const {rowData, paginationData} = MoviesSearch(1);

  const columns = [
    {headerName:"IMDB ID",field:"imdbID", hide:true},
    {headerName:"Title",field:"title"},
    {headerName:"Year",field:"year"},
    {headerName:"IMBD Rating",field:"imbdRating"},
    {headerName:"Rotten Tomates Rating",field:"rtRating"},
    {headerName:"Metacritic Rating",field:"mcRating"},
    {headerName:"Classification",field:"classification"},
  ];



  console.log(paginationData)

  return (
    <div className='movieContainer'>
      <h1>Book Container</h1>
      <p> Books published in 2000 in the Drama category</p>
      <div 
        className="ag-theme-balham"
        style={{ height: "650px", width: "1200px" }} 
      >
        <AgGridReact 
          columnDefs={columns} 
          rowData={rowData} 
          pagination={true} 
          paginationPageSize={20}
          onRowClicked={(row) => navigate(`/movieData?id=${row.data.imdbID}`)}
        />
      </div>
    </div>
  );
}