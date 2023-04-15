import React, {useState, useEffect} from"react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Book() {
  const [movieData, setMovieData] = useState({});

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() =>{
    fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${id}`)
    .then(res => res.json())
    .then(movie => setMovieData(movie));
  }, []); 

  return <h2>{movieData.title}</h2>;
}