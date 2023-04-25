// navigation links
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { CheckLoggedIn } from "../clientSide";


export default function Nav() {

  const isLoggedIn = CheckLoggedIn();

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        {isLoggedIn ? (
          <React.Fragment>
            <li><Link to="/logout">Logout</Link></li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}
