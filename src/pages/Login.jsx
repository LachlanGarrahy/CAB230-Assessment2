import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { LoginRequest } from "../api";

// jsx page for login page
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // handles change for email input and updates its state
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  // handles change for password input and updates its state
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // handles the form submission
  function handleSubmit(event) {
    event.preventDefault();
    LoginRequest(email, password); // makes a login request
    navigate("/"); // navigates to the home page if successful
  }

  return (
    <Form className='loginForm' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  value={password} onChange={handlePasswordChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Log in
      </Button>
    </Form>
    
  );
}