import { useNavigate, useSearchParams } from "react-router-dom";
import { MovieIDSearch } from "../api";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

export default function MovieData() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const {loading, movieData, error} = MovieIDSearch(id);

  if(loading){
    return (<p>Loading...</p>);
  }

  if (error){
    return (<p>Something went wrong: {error.message}</p>)
  }

  const columns = [
    {headerName:"IMDB ID",field:"id", hide:true},
    {headerName:"Role",field:"category"},
    {headerName:"Name",field:"name"},
    {headerName:"Character",field:"character"}
  ];

  const actors = movieData.principals

  const rowData = (MoviePrincipalData(actors))

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
      <div 
        className="ag-theme-balham"
        style={{ height: "360px", width: "600px" }} 
      >
        <AgGridReact 
            columnDefs={columns} 
            rowData={rowData} 
            pagination={true} 
            paginationPageSize={10}
            onRowClicked={(row) => navigate(`/actorPage?id=${row.data.id}`)}
          />
      </div>
    </div>
    
  );
}

function MoviePrincipalData(principals) {
  if(principals === null){
    return []
  }
  const actors = principals.map(actor => ({
    id: actor.id,
    category: actor.category,
    name: actor.name,
    character: actor.characters[0]
  }))
  return actors
}