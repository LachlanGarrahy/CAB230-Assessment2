import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import { GetPersonDetails, RefreshRequest } from './api';

export function CheckLoggedIn() {
  const tokenTime = localStorage.getItem("refreshTime");
  const tokenData = localStorage.getItem("refreshToken");

  if(!refreshValidTime(tokenTime)|tokenData === null){return false};

  if(AccessMovieData('nm0001772').error !== null){return false;};

  return true;
}

export function AccessMovieData(id) {
  const tokenTime = localStorage.getItem("bearerTime");
  const token = localStorage.getItem("bearerToken");
  const tokenValid = refreshValidTime(tokenTime) && tokenDataValid(token)
  if(!tokenValid){
    RefreshBearer();
  }
  const { loading, actorData, error} = GetPersonDetails(id);

  return {loading, actorData, error} ;
}

async function RefreshBearer(){
  const navigate = useNavigate();
  const tokenTime = localStorage.getItem("refreshTime");
  const token = localStorage.getItem("refreshToken");
  const tokenValid = refreshValidTime(tokenTime) && tokenDataValid(token)
  if(!tokenValid){
    navigate(`/login`);
  } 
  try {
    await RefreshRequest();
  } catch (error){
    console.log(error);
  }
}

function tokenDataValid(token){
  if (token === null) {return false};
  return true;
}

function refreshValidTime(tokenTime) {
  if(tokenTime > Math.floor(Date.now() / 1000)){ return true};
  return false;
}