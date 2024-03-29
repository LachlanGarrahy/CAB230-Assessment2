import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RegisterRequest } from "../api";

// register page
export default function Register() {
  // use states for the entries
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // updates the email entry on change
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  // updates the password entry on change
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // updates the confirm password entry on change
  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  // handles the submit of the page
  function handleSubmit(event) {
    event.preventDefault();
    try{
      RegisterRequest(email, password); // call to register the user
    } catch (error){
      console.log(error); // outputs error
    } finally {
      navigate("/login"); // navigates user to login page
    }    
  }

  // form for registering user
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
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password"  value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={password !== confirmPassword}>
        Register
      </Button>
      {password !== confirmPassword && <span style={{color: 'red'}}>Passwords do not match</span>}
    </Form>
  );
}

