import Nav from "./Nav";

// the header
export default function Header() {
  return (
    <header>
      <div id="icon">
        <img src="img/camera.svg" alt="Icon" />
      </div>
      <div id="header_title">
        <h2>FilmPedia</h2>
      </div>

      <Nav />
    </header>
  );
}
