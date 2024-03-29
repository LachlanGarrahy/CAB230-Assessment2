import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import React from 'react';
import { CheckLoggedIn } from "../clientSide";

// the header
export default function Header() {
  const isLoggedIn = CheckLoggedIn();
  let page = null;

  // check for whether the user is logged in and changes the nav bar to reflect this
  isLoggedIn ? (
    page = (
      <header>
        <Navbar expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img 
                src="img/icon.png" 
                alt="Icon" 
                width="40"
              />{' '}
              FilmPedia
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/movies">Movies</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
      </header>
    )
  ) : (
    page = (
      <header>
        <Navbar expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img 
                src="img/icon.png" 
                alt="Icon" 
                width="40"
              />{' '}
              FilmPedia
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/movies">Movies</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
      </header>
    )
  )

  return page;
}
