import { useEffect, useState } from 'react';

const API_URL = `http://sefdb02.qut.edu.au:3000`;

export function LoginRequest(email, password) {
    const url = `${API_URL}/user/login`;

    return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then((res) => res.json()
    .then((res) => {localStorage.setItem("token", res.bearerToken.token);
    console.log(res);}))
    .catch((error) => console.log(error));
}

export function RegisterRequest(email, password) {
    const url = `${API_URL}/user/register`;

    return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then((res) => res.json()
    .then((res) => {console.log(res);}))
    .catch((error) => console.log(error));
}

export function MovieIDSearch (id) {
    const url = `${API_URL}/movies/data/${id}`
    const [movieData, setMovieData] = useState({});

    useEffect(() =>{
        fetch(url)
        .then(res => res.json())
        .then(movie => setMovieData(movie));
    }, []); 

    return movieData;
}

export function MoviesSearch (){
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch("http://sefdb02.qut.edu.au:3000/movies/search?" + new URLSearchParams({
          page: "1",
        }))
        .then(res => res.json())
        .then(output => output.data)
        .then(data =>
          data.map(movie => ({
            title: movie.title,
            year: movie.year,
            imdbID: movie.imdbID,
            imbdRating: movie.imdbRating,
            rtRating: movie.rottenTomatoesRating,
            mcRating: movie.metacriticRating,
            classification: movie.classification
          }))
        )
        .then(movies => setRowData(movies));
      }, []); 

    return rowData;
}

export function GetPersonDetails (id){
    const url = `${API_URL}/people/${id}`;
    const token = localStorage.getItem("token")

    return fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
     },
    })
    .then((res) =>
        res.json().then((res) => {
            console.log(res);
        })
    )
    .catch((error) => console.log(error));
};


