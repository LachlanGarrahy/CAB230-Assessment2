import { useNavigate, useSearchParams } from "react-router-dom";
import { MovieIDSearch } from "../api";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

export default function MovieData() {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const {loading, movieData, error} = MovieIDSearch(id);
  console.log(movieData);

  if(loading){
    return (<p>Loading...</p>);
  }

  if (error){
    return (<p>Something went wrong: {error.message}</p>)
  }

  const columns = [
    {headerName:"IMDB ID",field:"ID", hide:true},
    {headerName:"Category",field:"category"},
    {headerName:"Name",field:"name"},
    {headerName:"Character",field:"character"},
  ];

  return(
    <div>
      <div>
        <h1>{movieData.title}</h1>
        <p>Released: {movieData.year}, Runtime: {movieData.runtime}</p>
        {movieData.genres.map((genre) => (
          genre
        ))}
        {movieData.ratings.map((rating) => (
          <p>{rating.source}: {rating.value}</p>
        ))}
        <p>Country: {movieData.country}</p>
        <p>Box Office: ${movieData.boxoffice}</p>
        <p>{movieData.plot}</p>
      </div>
      <div>
        <img src={movieData.poster} alt="Movie Poster" />
      </div>
      <div>
      <AgGridReact 
          columnDefs={columns} 
          rowData={movieData.principals} 
          pagination={true} 
          paginationPageSize={10}
          //onRowClicked={(row) => navigate(`/movieData?id=${row.data.imdbID}`)}
        />
      </div>
    </div>
    
  );
}