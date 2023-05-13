import { useNavigate, useSearchParams } from "react-router-dom";
import { MovieIDSearch } from "../api";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import { Row, Col } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';

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
    <div className="movieDataContainer">
      <Row className='MovieDataRow'>
        <Col lg={6} md={6} sm={12} xs={12}>
        <div>
          <h1 className="movieTitle">{movieData.title}</h1>
          <div className="movieInfo">
            <p>Released: {movieData.year}, Runtime: {movieData.runtime}</p>
            <p>Genres: {movieData.genres.map((genre) => (
              genre + " "
            ))}</p>
            <p>Country: {movieData.country}</p>
            <p>Box Office: ${movieData.boxoffice}</p>
          </div>
          <div className="plotContainer">
            <p className="plotParagraph">Plot: {movieData.plot}</p>
          </div>
        </div>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
        <div>
          <img src={movieData.poster} alt="Movie Poster" />
        </div>
        </Col>
      </Row>
      <Row className="movieActorTable">
        <Col lg={6} md={6} sm={12} xs={12}>
          <div 
            className="ag-theme-balham-dark"
            style={{ height: "360px" }} 
          >
            <AgGridReact 
                columnDefs={columns} 
                rowData={rowData} 
                pagination={true} 
                paginationPageSize={10}
                onRowClicked={(row) => navigate(`/actorPage?id=${row.data.id}`)}
              />
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="movieRatingContainer">
            {movieData.ratings.map((rating) => (
              <div className="movieRatingBadgeContainer">
                <Badge bg="secondary">{rating.source}: {rating.value}</Badge>
              </div>
            ))}
          </div>
          
        </Col>
      </Row>
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