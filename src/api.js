import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    .then((res) => {
      localStorage.setItem("bearerToken", res.bearerToken.token) 
      localStorage.setItem("bearerTime", res.bearerToken.expires_in + Math.floor(Date.now() / 1000))
      localStorage.setItem("refreshToken", res.refreshToken.token)
      localStorage.setItem("refreshTime", res.refreshToken.expires_in + Math.floor(Date.now() / 1000)) 
    }))
    .catch((error) => console.log(error));
}

export async function RegisterRequest(email, password) {
    const url = `${API_URL}/user/register`;
    const navigate = useNavigate();

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


