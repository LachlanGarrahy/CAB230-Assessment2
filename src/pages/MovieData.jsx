import { useNavigate, useSearchParams } from "react-router-dom";
import { MovieIDSearch } from "../api";

export default function Book() {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const movieData = MovieIDSearch(id);

  return <h2>{movieData.title}</h2>;
}