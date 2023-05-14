import { useNavigate, useSearchParams } from "react-router-dom";
import { AccessMovieData } from "../clientSide";

import React from "react";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// jsx page for the actor page
export default function ActorPage(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const {loading, actorData, error} = AccessMovieData(id);
    const roles = actorData.roles
    const rowData = MovieRoleData(roles);

    // sets columns for table
    const columns = [
        {headerName:"IMDB ID",field:"id", hide:true},
        {headerName:"Role",field:"category"},
        {headerName:"Name",field:"name"},
        {headerName:"Character",field:"character"},
        {headerName:"Rating",field:"imdbRating"}
    ];
    // sets options for graph
    const labels = rowData.map(role => (role.name))
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Average IMDB Ratings',
        },
      },
    };

    // sets the data for the graph
    const data = {
      labels,
      datasets: [
        {
          label: 'Ratings',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: rowData.map(role => (role.imdbRating))
        }
      ]
    };
    
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
          <Bar options={options} data={data} />
        </div>
        
      );
}

// function to re-write the movie data for easier mapping in the table
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