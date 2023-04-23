import React from "react";
import { useNavigate } from 'react-router-dom';

import { LoginRequest } from "../api";
import { GetPersonDetails } from "../api";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <form 
        onSubmit={(event) => {
          LoginRequest(event.target.elements.email.value, event.target.elements.password.value)
          console.log(GetPersonDetails("nm0000408"))
          navigate('/');
        }}
      >
        <label htmlFor="name">Your Email: </label>
        <input id="email" name="email" type="text" />
        <label htmlFor="name">Your Password: </label>
        <input id="password" name="password" type="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
