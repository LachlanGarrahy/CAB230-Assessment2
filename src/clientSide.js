import React, { useState, useEffect } from 'react';

import { GetPersonDetails, RefreshRequest } from './api';

export function CheckLoggedIn() {
  const tokenTime = localStorage.getItem("refreshTime");
  const tokenData = localStorage.getItem("refreshToken");

  if(!refreshValid(tokenTime)|tokenData === null){return false};

  if(AccessMovieData('nm0001772').error !== null){return false;};

  return true;
}

export function AccessMovieData(id) {
  const tokenTime = localStorage.getItem("bearerTime");
  const tokenValid = refreshValid(tokenTime)
  if(!tokenValid){
    refreshBearer();
  }
  const { loading, actorData, error} = GetPersonDetails(id);

  return {loading, actorData, error} ;
}

async function refreshBearer(){
  const tokenTime = localStorage.getItem("refreshTime");
  const tokenValid = refreshValid(tokenTime)
  if(tokenValid){
    try {
      await RefreshRequest();
    } catch (error){
      console.log(error)
    }
  }
}

function refreshValid(tokenTime) {
  if(tokenTime > Math.floor(Date.now() / 1000)){ return true};
  return false;
}