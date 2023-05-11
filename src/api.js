import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';

const API_URL = `http://sefdb02.qut.edu.au:3000`;

export async function LoginRequest(email, password) {
    const url = `${API_URL}/user/login`;

    try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const res_1 = await res.json();
    localStorage.setItem("bearerToken", res_1.bearerToken.token);
    localStorage.setItem("bearerTime", res_1.bearerToken.expires_in + Math.floor(Date.now() / 1000));
    localStorage.setItem("refreshToken", res_1.refreshToken.token);
    localStorage.setItem("refreshTime", res_1.refreshToken.expires_in + Math.floor(Date.now() / 1000));
  } catch (error) {
    return console.log(error);
  } finally {
    window.location.reload();
  }
}

export async function RegisterRequest(email, password) {
    const url = `${API_URL}/user/register`;

    try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const res_1 = await res.json();
    console.log(res_1);
  } catch (error) {
    return console.log(error);
  }
}

export function MovieIDSearch (id) {
    const url = `${API_URL}/movies/data/${id}`
    const [loading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() =>{
      async function fetchData() {
        try {
          const response = await fetch(url);
          const jsonData = await response.json();
          setMovieData(jsonData);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, []); 

    return {loading, movieData, error};
}

export function MoviesSearch (pageNum, search, year){
  const url = `${API_URL}/movies/search?title=${search}&year=${year}&page=${pageNum}`;

  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [paginationData, setPaginationData] = useState([]);

    useEffect(() => {
      async function fetchMovieData() {
        try{
          const response = await fetch(url);
          const jsonData = await response.json();
          setRowData(mapMovieData(jsonData.data));
          setPaginationData(jsonData.pagination);
        } finally {
          setLoading(false);
        }
      }

      function mapMovieData(data){
        const movies = data.map(movie => ({
          title: movie.title,
          year: movie.year,
          imdbID: movie.imdbID,
          imbdRating: movie.imdbRating,
          rtRating: movie.rottenTomatoesRating,
          mcRating: movie.metacriticRating,
          classification: movie.classification
        }))
        return movies
      }

      fetchMovieData();
      }, [pageNum, search, year]); 

    return {rowData, paginationData, loading};
}

export function GetPersonDetails (id){
    const url = `${API_URL}/people/${id}`;
    const token = localStorage.getItem("bearerToken")

    const [loading, setLoading] = useState(true);
    const [actorData, setActorData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
      async function fetchData(){
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (!response.ok){
          setError(response)
        }
        const jsonData = await response.json();
        setActorData(jsonData);
        setLoading(false);
      }
      fetchData();
    }, []);

    return {loading, actorData, error};
}

export async function LogoutRequest() {
  const url = `${API_URL}/user/logout`;
  const token = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token })
    });
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("refreshToken");
  } catch(error) {
    console.log(error);
  } finally {
    window.location.reload();
    navigate("/");
  }
}

export async function RefreshRequest() {
  const url = `${API_URL}/user/refresh`;
  const token = localStorage.getItem("refreshToken");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: token })
  });

  if (!response.ok){
    throw new Error('Failed to refresh acess token')
  }

  const jsonData = await response.json();

  localStorage.setItem("bearerToken", jsonData.bearerToken.token) 
  localStorage.setItem("bearerTime", jsonData.bearerToken.expires_in)
  localStorage.setItem("refreshToken", jsonData.refreshToken.token)
  localStorage.setItem("refreshTime", jsonData.refreshToken.expires_in + Math.floor(Date.now() / 1000)) 
}


