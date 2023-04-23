import React from "react";
import { useNavigate } from 'react-router-dom';

import { RegisterRequest } from "../api";
import { GetPersonDetails } from "../api";

export default function Register() {
    const navigate = useNavigate();

    return (
      <div>
        <form 
          onSubmit={(event) => {
            RegisterRequest(event.target.elements.email.value, event.target.elements.password.value)
            navigate('/login');
          }}
        >
          <label htmlFor="name">Your Email :</label>
          <input id="email" name="email" type="text" />
          <label htmlFor="name">Your Password :</label>
          <input id="password" name="password" type="password" />
          <label htmlFor="name">Confirm Your Password :</label>
          <input id="passwordConf" name="passwordConf" type="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
}
