import { useNavigate, useSearchParams } from "react-router-dom";
import { AccessMovieData } from "../clientSide";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

export default function ActorPage(){
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const {loading, actorData, error} = AccessMovieData(id);

    const roles = actorData.roles

    const rowData = MovieRoleData(roles);

    const columns = [
        {headerName:"IMDB ID",field:"id", hide:true},
        {headerName:"Role",field:"category"},
        {headerName:"Name",field:"name"},
        {headerName:"Character",field:"character"},
        {headerName:"Rating",field:"imdbRating"}
      ];
    

    if(loading){
        return (<p>Loading...</p>);
    }

    if (error){
        return (<p>Something went wrong: {error.message}</p>)
    }

    return(
        <div className="actorPage">
          <div className="actorData">
            <h1>{actorData.name}</h1>
            <p>Born: {actorData.birthYear} {actorData.deathYear === null ? null : <p>Died: {actorData.deathYear}</p>}</p>
          </div>
          <div className="actorTable">
            {<div 
              className="ag-theme-balham-dark"
              style={{ height: "365px", width: "800px" }} 
            >
              <AgGridReact 
                  columnDefs={columns} 
                  rowData={rowData} 
                  pagination={true} 
                  paginationPageSize={10}
                  onRowClicked={(row) => navigate(`/movieData?id=${row.data.id}`)}
                />
            </div>}
          </div>
        </div>
        
      );
}


function MovieRoleData(roles) {
    if(roles === undefined){
        return []
    }
    
    roles = roles.map(role => ({
        id: role.movieId,
        category: role.category,
        imdbRating: role.imdbRating,
        name: role.movieName,
        character: role.characters[0]
        }))
    return roles
  }