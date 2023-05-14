import { useNavigate } from "react-router-dom";
import { GetPersonDetails, RefreshRequest } from './api';

// function to check if the user is currently logged in
export function CheckLoggedIn() {
  // retrieves the tokens from storage
  const tokenTime = localStorage.getItem("refreshTime");
  const tokenData = localStorage.getItem("refreshToken");

  // checks if the token data and time are valid
  if(!refreshValidTime(tokenTime)|tokenData === null){return false};

  // checks if the app can retrieve data from the api
  if(AccessMovieData('nm0001772').error !== null){return false;};

  // return true if the user is authenticated
  return true;
}

// function to access movie data with user id and returns data if possible
export function AccessMovieData(id) {
  // retrieves tokens from storage
  const tokenTime = localStorage.getItem("bearerTime");
  const token = localStorage.getItem("bearerToken");
  // checks if the tokens are currently valid
  const tokenValid = refreshValidTime(tokenTime) && tokenDataValid(token)
  if(!tokenValid){
    RefreshBearer();
  }
  //attempts to retrieve data
  const { loading, actorData, error} = GetPersonDetails(id);
  //returns data
  return {loading, actorData, error} ;
}

// function to call the function to refresh the bearer
async function RefreshBearer(){
  const navigate = useNavigate();
  // retrieves tokens from storage
  const tokenTime = localStorage.getItem("refreshTime");
  const token = localStorage.getItem("refreshToken");
  // checks if the tokens are valid
  const tokenValid = refreshValidTime(tokenTime) && tokenDataValid(token)
  // redirects the user to the login page if the tokens are not valid
  if(!tokenValid){
    navigate(`/login`);
  } 
  // attemtps to refresh token and prints error if failed
  try {
    await RefreshRequest();
  } catch (error){
    console.log(error);
  }
}

// fucntion to check if token data is present in the browser
function tokenDataValid(token){
  if (token === null) {return false};
  return true;
}

// function to check if the token time is valid
function refreshValidTime(tokenTime) {
  if(tokenTime > Math.floor(Date.now() / 1000)){ return true};
  return false;
}