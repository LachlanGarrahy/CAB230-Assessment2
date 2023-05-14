import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = `http://sefdb02.qut.edu.au:3000`;

// function to process login requests
export async function LoginRequest(email, password) {
    const url = `${API_URL}/user/login`;

    try {
    const res = await fetch(url, { // call to login user
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const res_1 = await res.json();
    // sets tokens in local storage
    localStorage.setItem("bearerToken", res_1.bearerToken.token);
    localStorage.setItem("bearerTime", res_1.bearerToken.expires_in + Math.floor(Date.now() / 1000));
    localStorage.setItem("refreshToken", res_1.refreshToken.token);
    localStorage.setItem("refreshTime", res_1.refreshToken.expires_in + Math.floor(Date.now() / 1000));
  } catch (error) {
    return console.log(error);
  } finally {
    window.location.reload(); // reloads page to update nav bar
  }
}

// function to process register request
export async function RegisterRequest(email, password) {
    const url = `${API_URL}/user/register`;

    // call to register user
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    // throws error if registration failed
    if (!res.ok){
      throw Error('Something went wrong');
    }
}

// function to process retrieving movie data
export function MovieIDSearch (id) {
    const url = `${API_URL}/movies/data/${id}`
    const [loading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState({});
    const [error, setError] = useState(null);

    // makes request and sets corresponding data fields
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

// function to retrieve movie data 
export async function MoviesSearchInfin (pageNum, search, year){
  const url = `${API_URL}/movies/search?title=${search}&year=${year}&page=${pageNum}`;
    const response = await fetch(url);

    if (!response.ok){
      throw new Error('Falied to retrieve data')
    }

    const jsonData = await response.json();
    const total = jsonData.pagination.total;
    const data = mapMovieData(jsonData.data);
    return {total, data};

  // function to change the labels of the json object returned
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
}

// function to get the details on people
export function GetPersonDetails (id){
    const url = `${API_URL}/people/${id}`;
    const token = localStorage.getItem("bearerToken") // retireves the token from local storage

    const [loading, setLoading] = useState(true);
    const [actorData, setActorData] = useState({});
    const [error, setError] = useState(null);

    // call to retireve the data and return it
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

// function to logout the user
export async function LogoutRequest() {
  const url = `${API_URL}/user/logout`;
  const token = localStorage.getItem("refreshToken"); // retrieves the token from local storage
  const navigate = useNavigate();

  // makes the request to logout the user
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token })
    });
    localStorage.removeItem("bearerToken"); // removes the token from storage
    localStorage.removeItem("refreshToken"); // removes the token from storage
  } catch(error) {
    console.log(error);
  } finally {
    window.location.reload(); // resets the nav bar
    navigate("/"); // navigates to the home page
  }
}

// function to refresh the users current bearer token
export async function RefreshRequest() {
  const url = `${API_URL}/user/refresh`;
  const token = localStorage.getItem("refreshToken"); // retrieves the token from local storage

  // makes the request to regresh the token
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: token })
  });

  // throws error if something went wrong
  if (!response.ok){
    throw new Error('Failed to refresh acess token')
  }

  const jsonData = await response.json();

  // resets the tokens in local storage
  localStorage.setItem("bearerToken", jsonData.bearerToken.token) 
  localStorage.setItem("bearerTime", jsonData.bearerToken.expires_in + Math.floor(Date.now() / 1000))
  localStorage.setItem("refreshToken", jsonData.refreshToken.token)
  localStorage.setItem("refreshTime", jsonData.refreshToken.expires_in + Math.floor(Date.now() / 1000)) 
}


