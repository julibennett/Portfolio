import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <h1 className="text-3xl font-bold text-center mb-4 munda">Julianna Bennett's Portfolio</h1>
      <nav className="flex justify-around border-4 border-black p-4 w-11/12 mx-auto galactic">
        <Link to="/" className="hover:text-gray-300">
          <div className="text-xl">HOME</div>
        </Link>
        <Link to="/about" className="hover:text-gray-300">
          <div className="text-xl">ABOUT</div>
        </Link>
        <Link to="/projects" className="hover:text-gray-300">
          <div className="text-xl">PROJECTS</div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
