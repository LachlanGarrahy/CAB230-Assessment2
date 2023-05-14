import React from "react";
import Button from 'react-bootstrap/Button';

// home component
export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}

// hero content
const Hero = () => (
  <section className="hero">
    {/* content for the hero */}
    <div className="hero__content">
      <h1 className="hero__title">Welcome to <br></br>FilmPedia</h1>
      <p className="hero__subtitle">Find your next film here</p>
      <Button variant="dark" size="lg" href="/movies">Start Your Search</Button>
    </div>
  </section>
);
