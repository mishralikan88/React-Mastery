// App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <p>🏠 Home Page</p>;
}

function About() {
  return <p>ℹ️ About Page</p>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ margin: 10 }}>
        {/* Navigation Links */}
        <Link to="/" style={{ marginRight: 10 }}>
          Home
        </Link>
        <Link to="/about">About</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
