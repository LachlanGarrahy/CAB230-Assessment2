import React, { useState, useEffect } from 'react';

export function CheckLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const bearerToken = localStorage.getItem('bearerToken');

  useEffect(() => {
    if (bearerToken) {
        setIsLoggedIn(true);
    } else {
        setIsLoggedIn(false);
    }
  }, []);
  return isLoggedIn;
}